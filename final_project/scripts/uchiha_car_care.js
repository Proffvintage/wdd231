
document.addEventListener('DOMContentLoaded', function () {
  // Service Pricing Array
  const services = [
    { name: "Interior Detail", value: "interior", rate: 75 },
    { name: "Exterior Detail", value: "exterior", rate: 100 },
    { name: "Full Detail", value: "full", rate: 150 },
    { name: "Ceramic Coating", value: "ceramic", rate: 350 }

  ];
const pricingList = document.querySelector('#pricing_list ul');
if (pricingList) {
  pricingList.innerHTML = ''; // Clear any existing content
  services.forEach(service => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${service.name}:</strong> $${service.rate} per car`;
    pricingList.appendChild(li);
  });
}

  // Quote Form Field Array
  const quoteFormFields = [
    {
      type: "select",
      label: "Service Type:",
      id: "serviceType",
      required: true,
      options: [
        { value: "", text: "-- Select a Service --" },
        ...services.map(s => ({ value: s.value, text: s.name }))
      ]
    },
    { type: "number", label: "Number of cars:", id: "carsCount", min: 1, placeholder: "e.g. 1" },
    { type: "number", label: "Distance (miles):", id: "distanceMiles", min: 0, placeholder: "e.g. 5" }
  ];

  // Render Quote Form
  const calculatorSection = document.querySelector('.calculator');
  if (calculatorSection) {
    const form = document.createElement('form');
    form.id = "quoteForm";

    quoteFormFields.forEach(field => {
      const label = document.createElement('label');
      label.setAttribute('for', field.id);
      label.textContent = field.label;
      form.appendChild(label);

      let input;
      if (field.type === "select") {
        input = document.createElement("select");
        input.id = field.id;
        if (field.required) input.required = true;

        field.options.forEach(opt => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.text;
          input.appendChild(option);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type;
        input.id = field.id;
        input.min = field.min;
        input.placeholder = field.placeholder;
      }

      form.appendChild(input);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Get Your Price!";
    form.appendChild(button);

    calculatorSection.appendChild(form);

    const resultDiv = document.createElement("div");
    resultDiv.id = "quoteResult";
    resultDiv.setAttribute("aria-live", "polite");
    calculatorSection.appendChild(resultDiv);
  }

  // Quote Calculator Logic
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const serviceType = document.getElementById('serviceType').value;
      if (!serviceType) {
        alert("Please select a service type.");
        return;
      }

      const carsCount = parseInt(document.getElementById('carsCount').value, 10) || 1;
      const distanceMiles = parseInt(document.getElementById('distanceMiles').value, 10) || 0;

      const baseRate = services.find(s => s.value === serviceType)?.rate || 0;
      // Charging a travel fee of $2 per mile
      const travelFee = distanceMiles * 2;
      const total = (baseRate * carsCount) + travelFee;

      document.getElementById('quoteResult').textContent = `Estimated Quote: $${total.toFixed(2)}`;
    });
  }
});
