<template>
  <div class="boxbox">
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
     <button class="next-button" :disabled="!selectedOption" @click="navigateToNextPage">{{ nextButtonText }}</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Guide',

  setup() {
    
    const selectedOption = ref(null);


        const options = [
      { label: 'Cloud Computing', value: 'option1', info: 'As more and more organizations move to the cloud, understanding the different cloud platforms, how they work, and how to optimize for them becomes increasingly important. Research topics in cloud computing for infrastructure and DevOps could include exploring how to optimize cloud resources usage, analyzing cloud security and compliance, and developing tools to automate cloud deployment and management.', placeholder: './cloud-computing.png' },
      { label: 'Containerization and Orchestration', value: 'option2', info: 'Containerization has become a popular way to package and deploy applications. Container orchestration tools like Kubernetes are also widely used for managing containerized applications. Research topics in this area could include developing techniques for scaling and managing containers, analyzing performance issues, and exploring security concerns around containerization.', placeholder: '/placeholder2.png' },
      { label: 'DevOps Processes and Tools', value: 'option3', info: 'DevOps is a set of practices and tools that emphasizes collaboration and communication between development and operations teams. Research topics in this area could include exploring how to optimize DevOps processes, analyzing how to measure DevOps performance, and developing new tools to support DevOps practices.', placeholder: '/placeholder3.png' },
      { label: 'Infrastructure as Code', value: 'option3', info: 'Infrastructure as Code (IaC) is an approach to infrastructure management where infrastructure is defined using code. Research topics in this area could include exploring how to optimize IaC scripts, analyzing how to test IaC, and developing tools to automate IaC deployment.', placeholder: '/placeholder3.png' },
      { label: 'Serverless Architecture', value: 'option3', info: 'Serverless architecture is an approach to building applications that rely on third-party services to manage server-side logic and state. Research topics in this area could include exploring how to optimize serverless applications, analyzing serverless security, and developing tools to automate serverless deployment and management.', placeholder: '/placeholder3.png' },
    ];


    const navigateToNextPage = () => {
      // use the router.push method to navigate to the next page
    };

    return {
      selectedOption,
            options,
      navigateToNextPage,
    };
  },
};
</script>

<style>
.boxbox {
  height: 50vh;
  width: 50vw;
  border-radius: 20px;
  background-color: rgb(170, 170, 170);
  color : black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;
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