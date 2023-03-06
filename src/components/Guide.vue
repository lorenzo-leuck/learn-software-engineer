<template>
  <div class="container">
    <div v-if="showSelectedOption" class="selections-container">
      <div class="options">
        <div v-for="option in options" :key="option.value">
          <label>
            <input type="radio" v-model="selectedOption" :value="option" />
            {{ option.label }}
          </label>
        </div>
      </div>
      <div class="selected-option" v-if="selectedOption">
        <p>{{ selectedOption.info }}</p>
      </div>
    </div>
    <div v-if="showSelectedOption" class="button-container">
      <button
        class="next-button"
        :disabled="!selectedOption"
        @click="navigateToNextPage()"
      >
        next
      </button>
    </div>
  </div>

  <div v-if="!showSelectedOption">
    <div class="results-container">
      {{ selectedOption.label }}
      <div v-for="paper in paperData" :key="paper.title">
        <p>{{ paper.title }}</p>
        <a :href="paper.pdfUrl">pdf</a>
      </div>
    </div>
  </div>
</template>

<script>
import { createApp, ref } from "vue";
// import fetch from "node-fetch";
import axios from "axios";
import { DOMParser } from "xmldom";
import path from "path";

export default {
  name: "Guide",

  data() {
    return {
      showSelectedOption: true,
      paperData: null,
    };
  },

  updated() {
    const searchPapers = async (searchQuery, maxResults) => {
      const arXivEndpoint = `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(
        searchQuery
      )}&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

      try {
        const response = await axios.get(arXivEndpoint);
        const xmlString = response.data;
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, "text/xml");
        const entries = xml.getElementsByTagName("entry");
        const papersData = Array.from(entries).map((entry) => {
          const title = entry.getElementsByTagName("title")[0].textContent;
          const pdfUrl = Array.from(entry.getElementsByTagName("link"))
            .find((link) => link.getAttribute("title") === "pdf")
            .getAttribute("href");
          return { title, pdfUrl };
        });
        return papersData;
      } catch (error) {
        console.error(error);
      }
    };

    const maxResults = 3; // Maximum number of results to retrieve
    searchPapers(this.selectedOption.label, maxResults).then((papers) => {
      console.log(papers);
      this.loaded = true;
      this.paperData = papers;
    });

    // if (!this.showSelectedOption) {
    //   this.test = "baba";

    //   // Example usage:

    // }
  },

  setup() {
    const selectedOption = ref(null);

    const options = [
      {
        label: "Cloud Computing",
        value: "option1",
        info: "As more and more organizations move to the cloud, understanding the different cloud platforms, how they work, and how to optimize for them becomes increasingly important. Research topics could include exploring how to optimize cloud resources usage, analyzing cloud security and compliance, and developing tools to automate cloud deployment and management.",
        placeholder: "./cloud-computing.png",
      },
      {
        label: "Containerization and Orchestration",
        value: "option2",
        info: "Containerization has become a popular way to package and deploy applications. Container orchestration tools like Kubernetes are also widely used for managing containerized applications. Research topics in this area could include developing techniques for scaling and managing containers, analyzing performance issues, and exploring security concerns around containerization.",
        placeholder: "/placeholder2.png",
      },
      {
        label: "DevOps Processes and Tools",
        value: "option3",
        info: "DevOps is a set of practices and tools that emphasizes collaboration and communication between development and operations teams. Research topics in this area could include exploring how to optimize DevOps processes, analyzing how to measure DevOps performance, and developing new tools to support DevOps practices.",
        placeholder: "/placeholder3.png",
      },
      {
        label: "Infrastructure as Code",
        value: "option3",
        info: "Infrastructure as Code (IaC) is an approach to infrastructure management where infrastructure is defined using code. Research topics in this area could include exploring how to optimize IaC scripts, analyzing how to test IaC, and developing tools to automate IaC deployment.",
        placeholder: "/placeholder3.png",
      },
      {
        label: "Serverless Architecture",
        value: "option3",
        info: "Serverless architecture is an approach to building applications that rely on third-party services to manage server-side logic and state. Research topics in this area could include exploring how to optimize serverless applications, analyzing serverless security, and developing tools to automate serverless deployment and management.",
        placeholder: "/placeholder3.png",
      },
    ];

    // use the router.push method to navigate to the next page
    // return selectedOption.value ? 'Next' : 'Select an option';

    return {
      selectedOption,
      options,
    };
  },

  methods: {
    navigateToNextPage() {
      this.showSelectedOption = false;
    },
  },
};
</script>

<style>
.container {
  height: 70vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  background-color: rgb(170, 170, 170);
  border-radius: 20px;
}

.selections-container {
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
}

.results-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: black;
}

.next-button {
  font-size: 20px;
}

.options {
  margin-left: 80px;
  display: flex;
  flex-direction: column;
}
.selected-option {
  flex-basis: 40%;
  margin-right: 80px;
}
</style>
