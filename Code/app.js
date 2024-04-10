// Function to build metadata based on sample ID
function buildmetadata(sample) {
  // Retrieve JSON data from specified URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract metadata from JSON
    let metadata = data.metadata;
    // Filter metadata to find matching sample ID
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Select the first matching result
    let result = resultArray[0];
    // Select the HTML element where metadata will be displayed
    let meta = d3.select("#sample-metadata");

    // Clear any existing metadata
    meta.html("");
    // Iterate over metadata properties and display them
    for (i in result) {
      meta.append("h6").text(`${i.toUpperCase()}: ${result[i]}`);
    }
  })
}

// URL for JSON data
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Function to create bar and bubble charts based on sample ID
function buildCharts(sample) {
  // Retrieve JSON data from specified URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract sample data from JSON
    let samples = data.samples;
    // Filter sample data to find matching sample ID
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    // Select the first matching result
    let result = resultArray[0];

    // Extract sample values, OTU IDs, and OTU labels
    let sample_values = result.sample_values;
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;

    // Define layout for bubble chart
    let bubbleLayout = {
      title: "Bubble Chart of Samples",
      margin: { t: 30 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };

    // Define data for bubble chart
    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    // Plot bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Select top 10 OTU IDs for bar chart
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    // Define data for bar chart
    let barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ];

    // Define layout for bar chart
    let barLayout = {
      title: "Sample Chart",
      margin: { t: 30, l: 150 }
    };

    // Plot bar chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to initialize the dashboard
function Initializer() {
  // Select dropdown element
  let selector = d3.select("#selDataset");

  // Retrieve JSON data from specified URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract sample names from JSON
    let sample_names = data.names;
  
    // Populate dropdown with sample names
    for (let i = 0; i < sample_names.length; i++) {
      selector
        .append("option")
        .text(sample_names[i]) 
        .property("value", sample_names[i]);
    };

    // Initialize charts and metadata for first sample
    let first_sample = sample_names[0];
    buildCharts(first_sample);
    buildmetadata(first_sample);
  })
}

// Function to handle changes in selected sample
function optionChanged(newSample) {
  // Update charts and metadata based on new sample selection
  buildCharts(newSample);
  buildmetadata(newSample);
}

// Call Initializer function to set up the dashboard
Initializer();
