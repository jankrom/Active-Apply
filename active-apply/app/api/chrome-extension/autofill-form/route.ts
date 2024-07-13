"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import axios from "axios"
import { load } from "cheerio"
import prismadb from "@/lib/prismadb"
import { createClient } from "@/utils/supabase/server"

// api route to check add a spreadsheet row from extension
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({}, { status: 400 })
  }

  const jobUrl = req.nextUrl.searchParams.get("jobUrl") as string

  if (!jobUrl) return NextResponse.json({}, { status: 400 })

  let companyName = ""
  let position = ""
  let positionNumber = ""

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({}, { status: 401 })

  try {
    // first check that user paid
    const profile = await prismadb.profile.findUnique({
      where: { id: user.id },
    })
    if (!profile?.currentlyPaid) return NextResponse.json({}, { status: 404 })

    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
      method: "GET",
      url: jobUrl,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    })

    const $ = load(axiosResponse.data)

    //   wanted data:
    //   - metadata tag that has name=description, property=description, name=title.
    //             -- We want content attr from this.
    //   - title tag: the actual stuff inside it
    //   - url of the website

    const dataSeen = new Set<string>()

    // scrape meta data
    $("meta")
      .filter("[name*='description'],[name*='title'],[property*='description']")
      .each((index, element) => {
        const content = $(element).attr("content")
        if (content) dataSeen.add(content)
      })

    // scrape title
    dataSeen.add($("title").text())

    // make prompt from webscraped data
    let dataScraped = ""
    dataSeen.forEach((data) => (dataScraped += "," + data))

    const prompt =
      "Generate a json object based on the information of a job posting made by a company. You will give me the company name, job position, and job number in this json format: {companyName: string, jobPosition: string, jobNumber: string}. Here is the information: " +
      dataScraped +
      "," +
      jobUrl

    const { object } = await generateObject({
      model: openai("gpt-3.5-turbo-1106"),
      schema: z.object({
        companyName: z.string(),
        jobPosition: z.string(),
        jobNumber: z.string(),
      }),
      prompt: prompt,
    })

    companyName = object?.companyName
    position = object?.jobPosition
    positionNumber = object?.jobNumber
  } catch (error) {
    NextResponse.json(
      { companyName, position, positionNumber },
      { status: 404 }
    )
  }

  return NextResponse.json(
    { companyName, position, positionNumber },
    { status: 200 }
  )
}
