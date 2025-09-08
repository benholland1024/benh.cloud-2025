// This script converts TopoJSON world-atlas data to GeoJSON for use in the app.
// The original file, countries-110m.json, is from https://github.com/topojson/world-atlas
import fs from 'fs';
import topojson from 'topojson-client';
import Papa from 'papaparse';

// --- 1. Read and parse the CSV ---  
//  Data was taken from https://www.kaggle.com/datasets/nelgiriyewithana/countries-of-the-world-2023
//  and saved as world-data-2023.csv in the public/world-map folder.
const csv = fs.readFileSync('./public/world-map/world-data-2023.csv', 'utf8');
const { data: csvRows } = Papa.parse(csv, { header: true, skipEmptyLines: true });

// --- 2. Build a lookup by country name and ISO3 code ---
const countryByName = {};
const countryByISO3 = {};
csvRows.forEach(row => {
  // Clean up GDP value (remove $ and commas, trim spaces)
  let gdp = row.GDP || row['GDP'];
  if (gdp) {
    gdp = gdp.replace(/[\$, ]/g, ''); // Remove $, commas, spaces
    gdp = Number(gdp);
  }
  // Use ISO3 code if available, else Abbreviation
  const iso3 = row.Abbreviation || row.ISO3 || row['ISO3'];
  countryByName[row.Country.trim()] = { ISO3: iso3, GDP_MD_EST: gdp };
  if (iso3) countryByISO3[iso3.trim()] = { name: row.Country.trim(), GDP_MD_EST: gdp };
});

// --- 3. Handle known country name mismatches ---
const nameMapping = {
  "United States of America": "United States",
  "Czechia": "Czech Republic",
  "Republic of Korea": "South Korea",
  "Democratic Republic of the Congo": "Democratic Republic of the Congo",
  "Dem. Rep. Congo": "Republic of the Congo",
  "Côte d'Ivoire": "Ivory Coast",
  "Eswatini": "Swaziland",
  "Timor-Leste": "East Timor",
  "Congo": "Republic of the Congo",
  "Palestine": "Palestinian National Authority",
  "Dominican Republic": "Dominican Rep.",
  "North Macedonia": "North Macedonia",
  "Myanmar": "Myanmar",
  "Bahamas": "The Bahamas",
  "Gambia": "The Gambia",
  "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
  "Russian Federation": "Russia",
  "Viet Nam": "Vietnam",
  "Lao People's Democratic Republic": "Laos",
  "Syrian Arab Republic": "Syria",
  "Iran (Islamic Republic of)": "Iran",
  "Venezuela (Bolivarian Republic of)": "Venezuela",
  "Bolivia (Plurinational State of)": "Bolivia",
  "Brunei Darussalam": "Brunei",
  "United Republic of Tanzania": "Tanzania",
  "Republic of Moldova": "Moldova",
  "Cabo Verde": "Cape Verde",
  "Eswatini": "Eswatini",
  "Micronesia (Federated States of)": "Federated States of Micronesia",
  "São Tomé and Príncipe": "Sao Tome and Principe",
  // Add more as needed
};

// --- 4. Convert TopoJSON to GeoJSON ---
const topo = JSON.parse(fs.readFileSync('./public/world-map/countries-110m.json', 'utf8'));
const geo = topojson.feature(topo, topo.objects.countries);

// --- 5. Enrich GeoJSON features ---
geo.features.forEach(feature => {
  const props = feature.properties;
  let csvCountry = countryByName[props.name];

  // Try mapped name if not found
  if (!csvCountry && nameMapping[props.name]) {
    csvCountry = countryByName[nameMapping[props.name]];
  }

  // If still not found, try ISO3 code if available
  if (!csvCountry && props.ISO3) {
    csvCountry = countryByISO3[props.ISO3];
  }

  if (csvCountry) {
    props.ISO3 = csvCountry.ISO3;
    props.GDP_MD_EST = csvCountry.GDP_MD_EST;
  } else {
    // Optionally log missing countries
    console.warn(`No CSV match for: ${props.name}`);
  }
});

// --- 6. Write enriched GeoJSON ---
fs.writeFileSync('./public/world-map/countries-110m.geo.json', JSON.stringify(geo, null, 2));
console.log('GeoJSON enriched and saved!');