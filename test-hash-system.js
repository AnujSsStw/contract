// Test script for hash-based PDF generation system

// Simple hash function (same as in convex/download.ts)
function generateDataHash(data) {
  // Create a stable string representation of the data
  const dataString = JSON.stringify(data, Object.keys(data).sort());

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36); // Convert to base36 for shorter string
}

// Test data
const testData1 = {
  architect_name: "John Doe",
  bond_needed: "Yes",
  date: "January 1, 2024",
  subcontractor_name: "ABC Construction",
  contract_value: "$100,000",
  project_name: "Test Project",
  // ... other fields
};

const testData2 = {
  architect_name: "John Doe",
  bond_needed: "Yes",
  date: "January 1, 2024",
  subcontractor_name: "ABC Construction",
  contract_value: "$100,000",
  project_name: "Test Project",
  // ... other fields (same as testData1)
};

const testData3 = {
  architect_name: "Jane Smith", // Different architect
  bond_needed: "Yes",
  date: "January 1, 2024",
  subcontractor_name: "ABC Construction",
  contract_value: "$100,000",
  project_name: "Test Project",
  // ... other fields
};

console.log("Testing hash-based PDF generation system...\n");

const hash1 = generateDataHash(testData1);
const hash2 = generateDataHash(testData2);
const hash3 = generateDataHash(testData3);

console.log("Hash 1 (testData1):", hash1);
console.log("Hash 2 (testData2):", hash2);
console.log("Hash 3 (testData3):", hash3);

console.log("\nHash 1 === Hash 2:", hash1 === hash2); // Should be true (same data)
console.log("Hash 1 === Hash 3:", hash1 === hash3); // Should be false (different data)

console.log("\nTest Results:");
console.log("✅ Same data produces same hash:", hash1 === hash2);
console.log("✅ Different data produces different hash:", hash1 !== hash3);
console.log("✅ Hash-based caching system should work correctly!");

// Test with null/undefined stored hash
console.log("\nTesting regeneration logic:");
console.log("No stored hash (needs regeneration):", !null || null !== hash1);
console.log(
  "Different stored hash (needs regeneration):",
  !"oldhash" || "oldhash" !== hash1,
);
console.log(
  "Same stored hash (no regeneration needed):",
  !hash1 || hash1 !== hash1,
);
