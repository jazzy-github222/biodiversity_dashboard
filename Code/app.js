// First create a variable for link attachment
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch data from url
d3.json(url).then(function(data){
    console.log(data);
    // const top10Data = data.slice(0, 10);
});

// Create a bar chart with top 10 OTU
let sample_values = d3.Object.values("sample_values");
let otu_ids = Object.keys(data.otu_ids);

// Next step 
