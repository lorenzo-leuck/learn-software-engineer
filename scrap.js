import fetch from "node-fetch";
import { DOMParser } from "xmldom";

const searchQuery = "software engineering"; // Replace with your search term
const maxResults = 3; // Maximum number of results to retrieve

const arXivEndpoint = `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(
  searchQuery
)}&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

fetch(arXivEndpoint)
  .then((response) => response.text())
  .then((xmlString) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");
    const entries = xml.getElementsByTagName("entry");
    const papers = Array.from(entries).map((entry) => {
      const title = entry.getElementsByTagName("title")[0].textContent;
      const authors = Array.from(entry.getElementsByTagName("author")).map(
        (author) => author.getElementsByTagName("name")[0].textContent
      );
      const summary = entry.getElementsByTagName("summary")[0].textContent;
      const pdfUrl = Array.from(entry.getElementsByTagName("link"))
        .find((link) => link.getAttribute("title") === "pdf")
        .getAttribute("href");
      const publishedDate = new Date(
        entry.getElementsByTagName("published")[0].textContent
      );
      const rating = parseFloat(
        entry.getElementsByTagName("arxiv:doi")[0]?.textContent ?? "0"
      );
      const citationCount = parseInt(
        entry
          .getElementsByTagName("arxiv:journal_ref")[0]
          ?.textContent?.match(/\d+/)?.[0] ?? "0"
      );
      return {
        title,
        authors,
        summary,
        pdfUrl,
        publishedDate,
        rating,
        citationCount,
      };
    });
    // Sort papers by rating and citation count
    const sortedPapers = papers.sort(
      (a, b) => b.rating - a.rating || b.citationCount - a.citationCount
    );
    console.log(sortedPapers);
  })
  .catch((error) => console.error(error));
