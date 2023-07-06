const areaInput = document.getElementById('__area-input');
const areaHint = document.getElementById('__area-hint');
const wallsButton = document.getElementById('__area-calculate-walls');
const ceilingButton = document.getElementById('__area-calculate-ceiling');
const variantSelects = document.querySelector('variant-selects') || document.querySelector('variant-radios');
const consumation = document.getElementById('__consumation').value;

const variantData = () => variantSelects.getVariantData();
const currentVariant = () => variantSelects.currentVariant || variantData().find(variant => variant.id == document.getElementById('__variant').value);
const sectionId = () => variantSelects.dataset.section;
const quantityInput = () => document.getElementById(`Quantity-${sectionId()}`);
const sizes = () => variantData().filter(filterSizes).sort(sortSizes);
const defaultSize = () => sizes()[sizes().length - 1];

const areaResult = document.getElementById(`Result-${sectionId()}`);

function filterSizes(variant) {
  let differencesCounter = 0;
  let optionText = "";

  currentVariant().options.forEach((option, index) => {
    if (option !== variant.options[index]) {
      optionText = variant.options[index]
      differencesCounter++;
    }
  })

  if (differencesCounter === 0 || differencesCounter === 1 && variant.unit_price_measurement.quantity_value !== currentVariant().unit_price_measurement.quantity_value) {
    variant.sizeOption = optionText;
    return true;
  }
}

function sortSizes(a, b) {
  return (parseFloat(a.unit_price_measurement.quantity_value) > parseFloat(b.unit_price_measurement.quantity_value));
}

areaInput.addEventListener('input', handleAreaInput);

wallsButton.addEventListener('click', handleButtonClick);

ceilingButton.addEventListener('click', handleButtonClick);

function handleAreaInput() {
  hideResult();
  if (/^[0-9]+$/.test(areaInput.value)) {
    enableAreaButtons();
  } else {
    disableAreaButtons();
  }
}

function handleButtonClick(e) {
  areaHint.classList.add('__hide');

  setSizeAndQuantity(calculateNeed(e.target.id.includes('ceiling') ? 3.5 : 2.5));
}

function calculateNeed(factor) {
  const area = areaInput.value * factor;
  areaResult.innerHTML = `${areaInput.value}&nbsp;m<sup>2</sup> Boden&shy;fläche ent&shy;spre&shy;chen ${Math.round(area)}&nbsp;m<sup>2</sup> ${factor > 3 ? "Decken- und " : ""}Wandfläche.`;
  areaResult.classList.remove('__hide');
  return area * consumation;
}

function setSizeAndQuantity(need) {
  setQuantityOnVariantChange(need);
  setSize(need);
}

function setQuantityOnVariantChange(need) {
  const areaUnsubscriber = subscribe(PUB_SUB_EVENTS.variantChange, () => {
    setQuantity(need)
    areaUnsubscriber();
  })
}

function setSize(need) {
  for (let index = 0; index < sizes().length; index++) {
    const size = sizes()[index];
    clickIfSizeMatches(size, need);
  }
}

function clickIfSizeMatches(size, need) {
  if (parseFloat(size.unit_price_measurement.quantity_value) > need || size === defaultSize()) {
    dispatchEventIfNoVariantChange(size);
    clickVariant(size);
  };
}

function dispatchEventIfNoVariantChange(size) {
  if (currentVariant() === size) {
    variantSelects.dispatchEvent(new Event('change'));
  }
}

function setQuantity(need) {
  quantityInput().value = Math.ceil(need / parseFloat(defaultSize().unit_price_measurement.quantity_value))
  quantityInput().dispatchEvent(new Event('change'))
}

function clickVariant(variant) {
  document.querySelector(`input[value="${variant.sizeOption}"]`).click();
}

function hideResult() {
  areaResult.classList.add('__hide');
}

function disableAreaButtons() {
  areaHint.classList.add('__hide');
  wallsButton.classList.add('disabled');
  ceilingButton.classList.add('disabled');
}

function enableAreaButtons() {
  areaHint.classList.remove('__hide');
  wallsButton.classList.remove('disabled');
  ceilingButton.classList.remove('disabled');
}