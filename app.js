const btnAddCard = document.querySelector('[data-js="add-card"]')
const cardFormContainer = document.querySelector('[data-js="form-container"]')
const cardForm = document.querySelector('[data-js="card-form"]')
const cardContainer = document.querySelector('[data-js="cards-container"]')
const cardInfoContainer = document.querySelector('[data-js="card-info-container"]')
const searchInput = document.querySelector('[data-js="search-input"]')

const nameForm = document.querySelector('[data-js="name-form"]')
const description = document.querySelector('[data-js="description"]')
const imageUrl = document.querySelector('[data-js="image-url"]')
const typeOne = document.querySelector('[data-js="type-one"]')
const typeTwo = document.querySelector('[data-js="type-two"]')
const attr1 = document.querySelector('[data-js="attr1"]')
const attr1Points = document.querySelector('[data-js="attr1-points"]')
const attr2 = document.querySelector('[data-js="attr2"]')
const attr2Points = document.querySelector('[data-js="attr2-points"]')
const attr3 = document.querySelector('[data-js="attr3"]')
const attr3Points = document.querySelector('[data-js="attr3-points"]')
const attr4 = document.querySelector('[data-js="attr4"]')
const attr4Points = document.querySelector('[data-js="attr4-points"]')
const attr5 = document.querySelector('[data-js="attr5"]')
const attr5Points = document.querySelector('[data-js="attr5-points"]')
const attr6 = document.querySelector('[data-js="attr6"]')
const attr6Points = document.querySelector('[data-js="attr6-points"]')

const imageCardInfo = document.querySelector('[data-js="image-card-info"]')
const nameCardInfo = document.querySelector('[data-js="name-card-info"] > p')
const descriptionParagraph = document.querySelector('[data-js="description-paragraph"]')
const typeOneParagraph = document.querySelector('[data-js="type-one-paragraph"]')
const typeTwoParagraph = document.querySelector('[data-js="type-two-paragraph"]')
const attr1NameCardInfo = document.querySelector('[data-js="attr1-name-card-info"]')
const attr1PointsCardInfo = document.querySelector('[data-js="attr1-points-card-info"]')
const attr2NameCardInfo = document.querySelector('[data-js="attr2-name-card-info"]')
const attr2PointsCardInfo = document.querySelector('[data-js="attr2-points-card-info"]')
const attr3NameCardInfo = document.querySelector('[data-js="attr3-name-card-info"]')
const attr3PointsCardInfo = document.querySelector('[data-js="attr3-points-card-info"]')
const attr4NameCardInfo = document.querySelector('[data-js="attr4-name-card-info"]')
const attr4PointsCardInfo = document.querySelector('[data-js="attr4-points-card-info"]')
const attr5NameCardInfo = document.querySelector('[data-js="attr5-name-card-info"]')
const attr5PointsCardInfo = document.querySelector('[data-js="attr5-points-card-info"]')
const attr6NameCardInfo = document.querySelector('[data-js="attr6-name-card-info"]')
const attr6PointsCardInfo = document.querySelector('[data-js="attr6-points-card-info"]')

let arrayCards = new Array
let id = 1

id = localStorage.id ? JSON.parse(localStorage.id) : 1

arrayCards = localStorage.arrayCards ? JSON.parse(localStorage.arrayCards) : []

const showAndHidden = (element, classRemove, classAdd) => {
    element.classList.remove(classRemove)
    element.classList.add(classAdd)
}

const cardSearch = () => {
    Array
    .from(cardContainer.children)
    .forEach(checkTheNamesOfTheCardsAndRemoveTheDifferentOnesFromTheNameSearched)
}

const setTextInElements = (cardParagraph, deleteBtn, editBtn, nameForm) => {
    cardParagraph.textContent = nameForm
    deleteBtn.innerHTML = 'excluir'
    editBtn.innerHTML = 'editar'
}

const setClassInElements = (cardWrapper, cardHTML, deleteBtn, editBtn) => {
    cardWrapper.classList.add('card-wrapper')
    cardHTML.classList.add('card')
    deleteBtn.classList.add('delete')
    editBtn.classList.add('edit')
}

const editCard = event => {
    const cardId = event.target.getAttribute('id')
    const arrayCards = JSON.parse(localStorage.arrayCards)
   
    arrayCards.forEach(card => presetFormInfo(card, cardId))
}

const exit = (event, classRemove) => {
    const containerPrincipal = event.target.parentElement.parentElement

    showAndHidden(containerPrincipal, classRemove, 'hidden')

    document.body.style.overflow = "auto"
}

const deleteOldCard = (cardId) => {       
    const cardsThatHaveADifferentIdThanTheOneSelected = ({id}) => Number(id) !== Number(cardId)    
    
    const newCarddArray = JSON.parse(localStorage.arrayCards).filter(cardsThatHaveADifferentIdThanTheOneSelected)

    localStorage.setItem('arrayCards', JSON.stringify(newCarddArray))                
}

const showForm = () => {
    showAndHidden(cardFormContainer, 'hidden', 'form-container')
    resetFormValues()
    scrollTo(0, 0)
    
    document.body.style.overflow = "hidden"
}

const setItemsInLocalStorage = () => {    
    const cardFormInfo = createObjCard()

    arrayCards.push(cardFormInfo)
    id += 1

    localStorage.setItem('id', id)
    localStorage.setItem('arrayCards', JSON.stringify(arrayCards))
}

const showCardInfo = event => {
    if (Array.from(event.target.classList).includes('card')) {
        showAndHidden(cardInfoContainer, 'hidden', 'card-info-container')
        scrollTo(0, 0)
        setFormInfo(event.target)

        document.body.style.overflow = "hidden"  
    }
}

const deleteCard = event => {
    const cardId = event.target.getAttribute('id')
    const arrayCardsParsed = JSON.parse(localStorage.arrayCards)
 
    const cardsThatHaveADifferentIdThanTheOneSelected = ({id}) => Number(id) !== Number(cardId)
 
    const newCarddArray = arrayCardsParsed.filter(cardsThatHaveADifferentIdThanTheOneSelected)
     
    localStorage.setItem('arrayCards', JSON.stringify(newCarddArray))
    
    window.location.reload()
 }

const checkTheNamesOfTheCardsAndRemoveTheDifferentOnesFromTheNameSearched = cardWrapper => {
    const nameCard = cardWrapper.getAttribute('nameform').toUpperCase()
    const nameSearched = event.target.value.toUpperCase()
    
    const theNameOfTheSurveyIsTheSameAsTheNameOfTheCard = nameCard.includes(nameSearched)

    if (!theNameOfTheSurveyIsTheSameAsTheNameOfTheCard) {
        showAndHidden(cardWrapper, 'card-wrapper', 'hidden')
    }

    if (theNameOfTheSurveyIsTheSameAsTheNameOfTheCard) {
        showAndHidden(cardWrapper, 'hidden', 'card-wrapper')
    } 
}

const resetFormValues = () => {
    nameForm.value = ''
    description.value = ''
    imageUrl.value = ''
    typeOne.value = ''
    typeTwo.value = ''
    attr1.value = ''
    attr1Points.value = ''
    attr2.value = ''
    attr2Points.value = ''
    attr3.value = ''
    attr3Points.value = ''
    attr4.value = ''
    attr4Points.value = ''
    attr5.value = ''
    attr5Points.value = ''
    attr6.value = ''
    attr6Points.value = ''
}

const createObjCard = () => ({
    nameForm: nameForm.value.toUpperCase(),
    description: description.value,
    imageUrl: imageUrl.value,
    typeOne: typeOne.value,
    typeTwo: typeTwo.value,
    attr1: attr1.value,
    attr1Points: attr1Points.value,
    attr2: attr2.value,
    attr2Points: attr2Points.value,
    attr3: attr3.value,
    attr3Points: attr3Points.value,
    attr4: attr4.value,
    attr4Points: attr4Points.value,
    attr5: attr5.value,
    attr5Points: attr5Points.value,
    attr6: attr6.value,
    attr6Points: attr6Points.value,
    id: localStorage.id || 1
})

const addCardsInHTML = (card) => {
        const {nameForm, description, imageUrl, typeOne, typeTwo, attr1, attr1Points, attr2, attr2Points,
               attr3, attr3Points, attr4, attr4Points, attr5, attr5Points, attr6, attr6Points, id} = card
        
        const cardWrapper = document.createElement('div')
        const cardHTML = document.createElement('div')
        const deleteBtn = document.createElement('div')
        const editBtn = document.createElement('div')
        const cardParagraph = document.createElement('p') 

        setClassInElements (cardWrapper, cardHTML, deleteBtn, editBtn)
        setAttributeInElements(editBtn, deleteBtn, cardHTML, cardWrapper, nameForm, description, imageUrl, typeOne, typeTwo, attr1, 
        attr1Points, attr2, attr2Points,attr3, attr3Points, attr4, attr4Points, attr5, attr5Points, attr6, attr6Points, id)
        setTextInElements(cardParagraph, deleteBtn, editBtn, nameForm)

        cardHTML.append(cardParagraph)
        cardHTML.append(deleteBtn)
        cardHTML.append(editBtn)
        cardWrapper.append(cardHTML)
        cardContainer.prepend(cardWrapper)
}

const presetFormInfo = (card, cardId) => {
    if(Number(card.id) === Number(cardId)) {
        showAndHidden(cardFormContainer, 'hidden', 'form-container')
        scrollTo(0, 0)

        document.body.style.overflow = "hidden"
        nameForm.value = card.nameForm
        description.value = card.description
        imageUrl.value = card.imageUrl
        typeOne.value = card.typeOne
        typeTwo.value = card.typeTwo
        attr1.value = card.attr1
        attr1Points.value = card.attr1Points
        attr2.value = card.attr2
        attr2Points.value = card.attr2Points
        attr3.value = card.attr3
        attr3Points.value = card.attr3Points
        attr4.value = card.attr4
        attr4Points.value = card.attr4Points
        attr5.value = card.attr5
        attr5Points.value = card.attr5Points
        attr6.value = card.attr6
        attr6Points.value = card.attr6Points  
        
        cardForm.addEventListener('submit', () => deleteOldCard(cardId))
    }
}

const setFormInfo = (element) => {
        const imageUrl = element.getAttribute('imageUrl')
        const nameForm = element.getAttribute('nameForm')
        const description = element.getAttribute('description')
        const typeOne = element.getAttribute('typeOne')
        const typeTwo = element.getAttribute('typeTwo')
        const attr1 = element.getAttribute('attr1')
        const attr1Points = element.getAttribute('attr1Points')
        const attr2 = element.getAttribute('attr2')
        const attr2Points = element.getAttribute('attr2Points')
        const attr3 = element.getAttribute('attr3')
        const attr3Points = element.getAttribute('attr3Points')
        const attr4 = element.getAttribute('attr4')
        const attr4Points = element.getAttribute('attr4Points')
        const attr5 = element.getAttribute('attr5')
        const attr5Points = element.getAttribute('attr5Points')
        const attr6 = element.getAttribute('attr6')
        const attr6Points = element.getAttribute('attr6Points')
    
        imageCardInfo.style.backgroundImage = `url('${imageUrl}')`
        nameCardInfo.textContent = nameForm
        descriptionParagraph.textContent = description
        typeOneParagraph.textContent = typeOne
        typeTwoParagraph.textContent = typeTwo === '' ? '' : `/${typeTwo}` 
        attr1NameCardInfo.textContent = attr1
        attr1PointsCardInfo.textContent = attr1Points
        attr2NameCardInfo.textContent = attr2
        attr2PointsCardInfo.textContent = attr2Points
        attr3NameCardInfo.textContent = attr3
        attr3PointsCardInfo.textContent = attr3Points
        attr4NameCardInfo.textContent = attr4
        attr4PointsCardInfo.textContent = attr4Points
        attr5NameCardInfo.textContent = attr5
        attr5PointsCardInfo.textContent = attr5Points
        attr6NameCardInfo.textContent = attr6
        attr6PointsCardInfo.textContent = attr6Points
}

const setAttributeInElements = (editBtn, deleteBtn, cardHTML, cardWrapper, nameForm, description, imageUrl, typeOne, typeTwo, attr1, attr1Points, attr2, attr2Points,attr3, attr3Points, attr4, attr4Points, attr5, attr5Points, attr6, attr6Points, id) => {
    editBtn.setAttribute('Onclick', 'editCard(event)')
    editBtn.setAttribute('id', id)
    deleteBtn.setAttribute('Onclick', 'deleteCard(event)')
    deleteBtn.setAttribute('id', id)
    cardHTML.setAttribute('nameForm', nameForm)
    cardHTML.setAttribute('description', description)
    cardHTML.setAttribute('imageUrl', imageUrl)
    cardHTML.setAttribute('typeOne', typeOne)
    cardHTML.setAttribute('typeTwo', typeTwo)
    cardHTML.setAttribute('attr1', attr1)
    cardHTML.setAttribute('attr1Points', attr1Points)
    cardHTML.setAttribute('attr2', attr2)
    cardHTML.setAttribute('attr2Points', attr2Points)
    cardHTML.setAttribute('attr3', attr3)
    cardHTML.setAttribute('attr3Points', attr3Points)
    cardHTML.setAttribute('attr4', attr4)
    cardHTML.setAttribute('attr4Points', attr4Points)
    cardHTML.setAttribute('attr5', attr5)
    cardHTML.setAttribute('attr5Points', attr5Points)
    cardHTML.setAttribute('attr6', attr6)
    cardHTML.setAttribute('attr6Points', attr6Points)
    cardHTML.setAttribute('id', id)
    cardHTML.setAttribute('Onclick', 'showCardInfo(event)')
    cardWrapper.setAttribute('nameForm', nameForm)
    cardWrapper.setAttribute('description', description)
    cardWrapper.setAttribute('imageUrl', imageUrl)
    cardWrapper.setAttribute('typeOne', typeOne)
    cardWrapper.setAttribute('typeTwo', typeTwo)
    cardWrapper.setAttribute('attr1', attr1)
    cardWrapper.setAttribute('attr1Points', attr1Points)
    cardWrapper.setAttribute('attr2', attr2)
    cardWrapper.setAttribute('attr2Points', attr2Points)
    cardWrapper.setAttribute('attr3', attr3)
    cardWrapper.setAttribute('attr3Points', attr3Points)
    cardWrapper.setAttribute('attr4', attr4)
    cardWrapper.setAttribute('attr4Points', attr4Points)
    cardWrapper.setAttribute('attr5', attr5)
    cardWrapper.setAttribute('attr5Points', attr5Points)
    cardWrapper.setAttribute('attr6', attr6)
    cardWrapper.setAttribute('attr6Points', attr6Points)
    cardWrapper.setAttribute('id', id)
    cardWrapper.setAttribute('Onclick', 'showCardInfo(event)')
}

if (localStorage.arrayCards && localStorage.arrayCards.length >= 1) {
    const arrayCardsParsed = JSON.parse(localStorage.arrayCards)
    arrayCardsParsed.forEach(addCardsInHTML)
}

searchInput.addEventListener('input', cardSearch)

btnAddCard.addEventListener('click', showForm)

cardForm.addEventListener('submit', setItemsInLocalStorage)