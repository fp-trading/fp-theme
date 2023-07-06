const opener = document.getElementById('ModalOpener-color-picker');
const colorPickerContent = document.querySelector('.color-picker-content');
const colorPickerSearchInput = document.getElementById('color-picker-search-input');
const categoriesBreadcrumb = document.querySelector('.categories-breadcrumb');
const categoryBreadcrumb = document.getElementById('category-breadcrumb');
const searchBreadcrumb = document.getElementById('search-breadcrumb');
const colorPickerCategoryContent = document.getElementById('color-picker-category-content');
const farbtonInput = document.getElementById('farbton');
const variantSelector = document.querySelector('variant-selects') || document.querySelector('variant-radios');
const colorPickerCustom = document.getElementById('color-picker-custom');
let colorPickerCategoryElements = [];

prepareColors();


document.querySelector(`input[value="weiß"]`).addEventListener('click', () => {
  document.querySelectorAll('.media img').forEach(element => {
    element.style.backgroundColor = null;
  })
})

const stocolorSystem = {
  Weiß: ['aw11', 'aw15', 'sth01', 'sth02', 'sth04', 'y069504', 'y039302', 'y059503', 'y059505', 'y069407', 'y069308', 'y079302', 'y079303', 'y079209', 'y089407', 'y089303', 'y089107', 'y089007', 'y088708','y088711', 'y098813', 'y098517', 'y108713','y108216'],
  Gelb: ['y05 ', 'y06 ', 'y07 ', 'y08 '],
  Orange: ['y09 ', 'y10 ', 'y11 ', 'y12 ', 'y13 ', 'y14 ', 'y15 '],
  Rot: ['y16 ', 'r17 ', 'r18 ', 'r19 ', 'r20 ', 'r21 ', 'r22 ', 'r23 '],
  Violett: ['r24 ', 'r25 ', 'r26 ', 'r27 ', 'r28 ', 'r29 ', 'r30 ', 'r31 ', 'r32 ', 'r33 ', 'r34 ', 'r35 ', 'r36 ', 'r37 ', 'r38 ', 'r39 ', 'r40 '],
  Blau: ['b41 ', 'b42 ', 'b43 ', 'b44 ', 'b45 ', 'b46 ', 'b47 ', 'b48 ', 'b49 ', 'b50 ', 'b51 ', 'b52 ', 'b53 ', 'b54 ', 'b55 ', 'b56 ', 'b57 ', 'b58 ', 'b59 ', 'b60 ', 'b61 ', 'b62 '],
  Grün: ['b63 ', 'b64 ', 'b65 ', 'b66 ', 'b67 ', 'b68 ', 'b69 ', 'b70 ', 'b71 ', 'b72 ', 'y01 ', 'y02 ', 'y03 ', 'y04 ', 'y05 '],
  Grau: ['n00 ', 'r342501', 'b462603', 'b482803', 'b443703', 'y153901', 'b544102', 'y084003', 'y085003', 'y086003', 'y087003', 'y088003', 'y089003', 'y154503', 'y155503', 'y156503', 'y157503', 'y158503', 'y159403', 'r234003', 'r235003', 'r236003', 'r237003', 'r238003', 'r239003', 'r343503', 'r344503', 'r345503', 'r346503', 'r347503', 'r348503', 'b464003', 'b465003', 'b466003', 'b467003', 'b468003', 'b469003', 'b544503', 'b545503', 'b546503', 'b547503', 'b548503', 'b549503', 'b624003', 'b625003', 'b626003', 'b627003', 'b628003', 'b629003', 'b723503', 'b724503', 'b725503', 'b726503', 'b727503', 'b728503']
}

console.log(variantSelects.getVariantData())
const selectedVariant = () => variantSelector.currentVariant || variantSelects.getVariantData().find(variant => variant.id == document.getElementById('__variant').value);

console.log(farbtonInput)

if ((selectedVariant().title.includes('getönt') || selectedVariant().title.includes('FK0')) && farbtonInput.value.length === 0) {
  variantSelector.toggleAddButton(true, "Bitte Farbton wählen");
}

document.querySelector(`input[value="weiß"]`).addEventListener('click', () => {
  opener.innerText = "Farbton wählen";
  opener.style = "";
}) 

opener.addEventListener('click', () => {
  const modal = document.getElementById('PopupModal-color-picker');
  if (modal) modal.show(opener);
});

colorPickerSearchInput.addEventListener('input', (e) => {
  if (colorPickerSearchInput.value.length > 0) {
    handleSearchInput();
  } else {
    handleClearSearchInput();
  }
});

function handleSearchInput() {
  colorPickerContent.classList.add('level-2');
  filterSearch(colorPickerSearchInput.value);
  setSearchClass();
  setSearchBreadcrumb();
  enableOverviewBreadcrumb();
  setCustom();
}

function setCustom() {
  colorPickerCustom.querySelector('.color-picker-color-info').innerText = colorPickerSearchInput.value;
  colorPickerCustom.querySelector('#color-picker-button-custom').setAttribute('onclick', `selectColor('${colorPickerSearchInput.value} (Anfrage)', '01', 'rgb(255, 255, 255)')`);
  colorPickerCustom.querySelector('#color-picker-button-reorder').setAttribute('onclick', `selectColor('${colorPickerSearchInput.value} (Nachbestellung)', '01', 'rgb(255, 255, 255)')`);
}

function setSearchClass() {
  categoryBreadcrumb.classList.add('__link');
}

function setSearchBreadcrumb() {
  searchBreadcrumb.innerText = 'Suche: ' + colorPickerSearchInput.value;
}

function handleClearSearchInput() {
  filterSearch('');
  clearAll(colorPickerCategoryContent.className);
}

categoriesBreadcrumb.addEventListener('click', () => {
  if (colorPickerContent.classList.contains('level-2'))
    clearAll();
});

function clearAll(keepClass) {
  if (!keepClass) {
    categoriesBreadcrumb.classList.remove('__link');
    categoryBreadcrumb.innerText = '';
    colorPickerCategoryContent.className = '';
    colorPickerContent.classList.remove('level-2');
  }
  searchBreadcrumb.innerText = '';
  categoryBreadcrumb.className = '';
  colorPickerSearchInput.value = '';
}

categoryBreadcrumb.addEventListener('click', () => {
  if (colorPickerSearchInput.value.length > 0 && colorPickerCategoryContent.className !== '')
    clearSearch();
});

function clearSearch() {
  colorPickerSearchInput.value = '';
  colorPickerSearchInput.dispatchEvent(new Event('input'));
}

function goToCategory(name, stocolor) {
  enableOverviewBreadcrumb();
  setCategoryBreadcrumb(name, stocolor);
  setCategoryClass(name);
  goToColumnTwo();
}

function enableOverviewBreadcrumb() {
  categoriesBreadcrumb.classList.add('__link');
}

function setCategoryBreadcrumb(name, stocolor) {
  categoryBreadcrumb.innerText = stocolor ? 'StoColor System / ' + name : name;
}

function setCategoryClass(name) {
  colorPickerCategoryContent.classList.add(name.replaceAll(' ', '_'));
}

function goToColumnTwo() {
  colorPickerContent.classList.add('level-2');
  colorPickerCategoryContent.scrollTo(0, 0);
}

function filterSearch(searchValue) {
  for (let index = 1; index < colorPickerCategoryElements.length; index++) {
    const node = colorPickerCategoryElements[index];
    node.textContent.includes(' ')
    if (!searchValue || node.getAttribute('data-name').toLowerCase().includes(searchValue.toLowerCase())) {
      node.style.display = null;
    } else {
      node.style.display = 'none';
    }
  }
}

function searchInNode(searchValue, node) {
  return searchValue.split(' ').some(searchString => {
    node.innerText.includes(searchString)
  })
}

function createColorButtonHTML(name, color, className, colorCode, fk) {
  const clone = document.querySelector('#color-picker-category-element').content.firstElementChild.cloneNode(true);
  clone.classList.add(...className);
  clone.style.backgroundColor = color;
  clone.setAttribute('onclick', `selectColor('${colorCode}', '${fk}', '${color}')`);
  clone.setAttribute('data-name', name);
  clone.querySelector('.color-picker-color-info').innerText = name;
  return clone;
}


function selectColor(colorCode, fk, color) {
  farbtonInput.value = colorCode;
  document.querySelector(`input[value="${fk === '00' ? 'getönt' : 'FK' + fk}"]`).click();
  document.getElementById('ModalClose-color-picker').dispatchEvent(new Event('click'));
  opener.innerText = colorCode
  opener.style.backgroundColor = color
  opener.style.color = lightOrDark(color);
  document.querySelectorAll('.media img').forEach(element => {
    element.style.backgroundColor = color;
  })
  clearSearch();
}

function lightOrDark(color) {
  const values = color.replace('rgb(', '').split(',').map(value => parseInt(value));
  if (values.reduce((a, b) => a + b, 0) / values.length > 144) {
    return '#000000'
  } else {
    return '#FFFFFF'
  }
}

async function prepareColors() {
  const skus = product.variants.map(variant => variant.sku);
  const materialMachbarkeiten = await getMaterialMachbarkeiten(skus);
  const impossibleColors = {};
  
  (await getArrayOfImpossibleColors(materialMachbarkeiten)).forEach(colorID => {
    impossibleColors[colorID] = colorID;
  });

  const colorInfos = await getColorInfos();

  colorInfos.forEach(color => {
    const classList = color.Farbtonkarten_Bezeichnung === 'StoColor System 2022' || color.Farbtonkarten_Bezeichnung === 'STO'
    ? getStoColorSystemClass(color.Farbtonhilfsbezeichnung + color.Farbton_ID)
    : [ color.Farbtonkarten_Bezeichnung.replaceAll(' ', '_') ];
    if (!impossibleColors[color.Farbton_ID]) colorPickerCategoryContent.appendChild(createColorButtonHTML(color.Farbtonhilfsbezeichnung.replaceAll(' ', '') === color.Farbton_ID ? color.Farbtonhilfsbezeichnung : `${color.Farbtonhilfsbezeichnung} (${color.Farbton_ID})`, `rgb(${color.Rcolor}, ${color.Gcolor}, ${color.Bcolor})`, classList, color.Farbton_ID, color.Farbtonklasse));
  })

  colorPickerCategoryElements = document.querySelectorAll('.color-picker-category-element');
}

function getStoColorSystemClass(color) {
  let classes = []
  for (const key in stocolorSystem) {
    if (Object.hasOwnProperty.call(stocolorSystem, key)) {
      const range = stocolorSystem[key];
      if (range.some(element => color.toLowerCase().includes(element))) {
        classes.push(key);
      }
    }
  }

  return classes;
}

async function getMaterialMachbarkeiten(skus) {
  const materialMachbarkeitenArray = await (await fetch(materialMachbarkeitenURL)).json();

  return Array.from(new Set(materialMachbarkeitenArray.map(sku => {
    if (skus.includes(sku.Material)) return sku.Maba;
  }))).filter(machbarkeit => machbarkeit !== undefined);
}

async function getArrayOfImpossibleColors(materialMachbarkeiten) {
  const farbtonMachbarkeitenArray = await (await fetch(farbtonMachbarkeitenURL)).json();

  return farbtonMachbarkeitenArray.map(color => {
    if (materialMachbarkeiten.includes(color.Maba)) return color.Farbton_ID;
  }).filter(colorID => colorID !== undefined);
}

async function getColorInfos() {
  return await (await fetch(farbtonInfosURL)).json();
}