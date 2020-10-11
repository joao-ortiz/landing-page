function SelectEstates(o) {
  const options = o

  this.visible = false

  window.getSelect = function(elem) {
    const id = elem.closest('.dropdown').parentElement.id
    return window.dropdowns[id]
  }

  this.init = function() {
    const elem = document.getElementById(options.id)

    let startValue = options.value
    let html = `<div class='dropdown'>
                  <input class="hidden-estate" type="hidden" name="Estado" value="">
                  <div class='dropdown-value'>${startValue}
                  </div>
                  <div class='dropdown-arrow'><img src='./assets/select-arrow.svg'/></div>
                  <div class='dropdown-panel'>
                      <div class='dropdown-items'>
                      </div>
                  </div>
                </div>`

    elem.innerHTML = html

    if (!window.dropdowns) window.dropdowns = {}
    window.dropdowns[options.id] = this

    const items = elem.querySelector(".dropdown-items")
    const arrow = elem.querySelector(".dropdown-arrow")
    const value = elem.querySelector(".dropdown-value")
    const hidden = elem.querySelector(".hidden-estate")

    html = ""
    options.data.forEach(function(elem) {
      html += `<div class='dropdown-item' onclick='var self = getSelect(this);self.clicked(this)'>${elem}</div>`
    })

    items.innerHTML = html;

    this.clicked = function(elem) {
      event.stopPropagation()
      this.hide()
      value.innerHTML = elem.innerHTML
      hidden.value = elem.innerHTML
      value.classList.add('active-dropdown-value')
    }

    this.show = function() {
      this.visible = true
      items.classList.add("visible")
      arrow.classList.add("upsideDown")
    }

    this.hide = function() {
      this.visible = false
      items.classList.remove("visible")
      arrow.classList.remove("upsideDown")
    }

    var self = this
    value.addEventListener('mousedown', function() {
      if (self.visible) {
        self.hide()
      }else {
        self.show()
      }
    })
      arrow.addEventListener('mousedown', function() {
      if (self.visible) {
        self.hide()
      }else {
        self.show()
      }
    })
  }

  this.init()
  return this
}

let states = new SelectEstates({
  id: 'dropdown-id',
  value: 'Estado',
  data: [
   "Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"]

})

function CreateItems(o) {

  const items = o
  let itemsElem = document.getElementById('items')

  this.init = function() {

    let html = ''

    items.forEach(function(item) {

       let imageUrl = item.image
       let infoText = item.info

       html += `<div class="item">
                    <button onclick='showItemText("${infoText}", ${items.indexOf(item)})'><img id='button${items.indexOf(item)}' src="./assets/mais-1.svg"/></button>
                    <img src="./assets/${imageUrl}"/>
                </div>`
    })


    itemsElem.innerHTML = html
    window.showItemText(items[0].info,0)
  }

  let isDown = false
  let startX
  let scrollLeft

  itemsElem.addEventListener('mousedown', function (event) {

      itemsElem.style.scrollBehavior = "auto"
      isDown = true
      startX = event.pageX - itemsElem.offsetLeft
      scrollLeft = itemsElem.scrollLeft

  })

    itemsElem.addEventListener('mouseleave', function () {
    if(isDown) {
        itemsElem.style.scrollBehavior = "smooth"
        itemsElem.scrollLeft = ((itemsElem.scrollLeft / 166).toFixed()) * 166
        }

      isDown = false

  })

    itemsElem.addEventListener('mouseup', function () {
        if(isDown) {
            itemsElem.style.scrollBehavior = "smooth"
        itemsElem.scrollLeft = ((itemsElem.scrollLeft / 166).toFixed()) * 166
        }

      isDown = false

  })

    itemsElem.addEventListener('mousemove', function (event) {

      if(isDown) {
          event.preventDefault
          const x = event.pageX - itemsElem.offsetLeft
          const walk = x - startX
          itemsElem.scrollLeft = scrollLeft - walk
      }

  })



  this.init()
}

window.moveCarousel = function(direction){
  itemsElem.style.scrollBehavior = "smooth"
  if (direction === 1) {

      itemsElem.scrollLeft -= 166

  } else {

      itemsElem.scrollLeft += 166

  }
}

window.showItemText = function(text, buttonId) {

    if(!window.currentButton) {

        window.currentButton = "button" + buttonId

    } else if ( window.currentButton === `button${buttonId}`) {

        let currentButton = document.getElementById(window.currentButton)
        window.currentButton = null
        currentButton.src = "./assets/mais-1.svg"
        document.getElementById("cell-info").style.opacity = 0

         return
    } else {

        let currentButton = document.getElementById(window.currentButton)
        currentButton.src = "./assets/mais-1.svg"
        window.currentButton = "button" + buttonId

    }

    let button = document.getElementById(`button${buttonId}`)
    button.src = "./assets/mais.svg"
    document.getElementById("cell-info").style.opacity = 0
    setTimeout(function () {
               document.getElementById("cell-info").innerHTML = text
    document.getElementById("cell-info").style.opacity = 1
               }, 200)

}

let items = new CreateItems(
  [
    {
      image: "twt_icon01.svg",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrs standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      image: "twt_icon08.svg",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },{
      image: "twt_icon10.svg",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      image: "twt_icon08.svg",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
    {
      image: "twt_icon08.svg",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },{
      image: "twt_icon08.svg",
      info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
    },
  ]
)

function BannersCarousel(o) {

    let banners = o
    let bannersElem = document.getElementById('banners-carousel')
    let html = ''
    let indicatorsElem = document.querySelector(".indicators")
    let dots = ''

    banners.forEach(function (banner) {

        html += `<img src="./assets/${banner}"/>`
        dots += `<div onclick='moveBanners(${banners.indexOf(banner)})'></div>`

    })

    this.init = function () {

        bannersElem.innerHTML = html
        indicatorsElem.innerHTML = dots
        indicatorsElem.firstElementChild.className = "active-dot"

    }

    window.moveBanners = function(index) {

        bannersElem.style.scrollBehavior = "smooth"
        document.querySelector(".active-dot").className = ""
        bannersElem.scrollLeft = (window.innerWidth * index)
        indicatorsElem.childNodes[index].className = "active-dot"
        bannersElem.style.scrollBehavior = "auto"

    }

    window.moveBannerArrows = function(direction) {

        let childrens = document.querySelector('.active-dot').parentElement.children
        let activeDot = document.querySelector('.active-dot')
        let index = [...childrens].indexOf(activeDot)
        if (direction === 0 && childrens.length -1 > index) {
            moveBanners(index+1)
        } else if (direction === 1 && index > 0) {
            moveBanners(index-1)
        }

    }

    let isDown = false
    let startX
    let scrollLeft
    let windowWidth

    bannersElem.addEventListener('mousedown' , function(event) {
        windowWidth = window.innerWidth
        bannersElem.style.scrollBehavior = "auto"
        isDown = true
        startX = event.pageX
        scrollLeft = bannersElem.scrollLeft
    })

     bannersElem.addEventListener('mouseup' , function() {
        if(isDown) {
            let a = (bannersElem.scrollLeft / windowWidth).toFixed()
            bannersElem.style.scrollBehavior = "smooth"
               bannersElem.scrollLeft = a * windowWidth
            document.querySelector(".active-dot").className = ""
indicatorsElem.childNodes[a].className = "active-dot"
        }

      isDown = false
    })

     bannersElem.addEventListener('mouseleave' , function() {
        if(isDown) {

            let a = (bannersElem.scrollLeft / windowWidth).toFixed()
            bannersElem.style.scrollBehavior = "smooth"
               bannersElem.scrollLeft = a * windowWidth
            document.querySelector(".active-dot").className = ""
indicatorsElem.childNodes[a].className = "active-dot"
        }

      isDown = false
    })

     bannersElem.addEventListener('mousemove' , function(event) {
         event.preventDefault()
         if(isDown) {

            let x = event.pageX
            let walk = x - startX
            let walkFast = walk * 2
            bannersElem.scrollLeft = scrollLeft - walkFast
         }
    })

    this.init()
}

let banners = new BannersCarousel(
    ["Image 1.png","image 2.png","image 3.png"])

window.sendForm = function(o, route) {

    let formData = new FormData(o)
    let estate = document.querySelector('.dropdown-value').innerHTML

    let object = {}
    formData.forEach(function(value, key) {
      object[key] = value
    })
    object.estate = estate

    console.log(object)

    let xhr = new XMLHttpRequest()
    const url = '' + route
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")

}

let hidden = false

function headerScrolBehavior() {
    if(window.pageYOffset > 150) {
        hidden = true
        console.log(hidden)
        document.getElementById("pageHeader").classList.add("hideHeader")
        setTimeout(function() {
            document.getElementById("pageHeader").classList.remove("hideHeader")
            document.getElementById("pageHeader").classList.add("smallHeader")
        }, 200)
    } else  if (window.pageYOffset < 80 && hidden){
        hidden = false
        setTimeout(function() {
             document.getElementById("pageHeader").classList.remove("smallHeader")
        }, 200)

    }
}

function debounce(func, delay) {
    let inDebounce
    return function() {
        const context = this
        const args = null
        clearTimeout(inDebounce)
        inDebounce = setTimeout(function() { func.apply(context, args)}, delay)
    }
}

const elements = document.querySelectorAll('section')
const navItems = document.querySelectorAll('.menuLink')

 function changeHeaderActive() {
    let index = elements.length - 1

    while (index > 0 & window.scrollY + 200 < elements[index].offsetTop) {
      console.log(elements[index].offsetTop , window.scrollY, index)
      --index
    }

    navItems.forEach(function(link) { link.classList.remove('active')})
    navItems[index].classList.add('active')
 }

function scrollBehavior(o) {
    headerScrolBehavior()
    debounceHeader = debounce(changeHeaderActive, 100)
    debounceHeader()
}

function validateEmail(email) {
    var re = /[^@]+@[^\.]+\..+/g
    if (re.test(String(email).toLowerCase())){
        return true
    } else {
        return false
    }
}

window.checkEmail = function(elem) {

  let container = elem.parentElement
  let icon = container.querySelector('img')

  console.log(icon)

  if (validateEmail(elem.value)) {

    icon.parentElement.style.opacity = 0
    setTimeout(function(){
      icon.src = "./assets/verify.svg"
      icon.parentElement.style.opacity = 1
    },200)

  } else {

    icon.parentElement.style.opacity = 0
    setTimeout(function(){
      icon.src = "./assets/error.svg"
      icon.parentElement.style.opacity = 1
    },200)

  }
}


window.onscroll = scrollBehavior

window.showPrice = function() {
  document.getElementById('mask').style.zIndex = 2
  document.getElementById('mask').style.opacity = 1
  document.getElementById('corpse').style.overflow = 'hidden'
}

window.hidePrice = function() {
  document.getElementById('mask').style.zIndex = -1
  document.getElementById('mask').style.opacity = 0
  document.getElementById('corpse').style.overflow = 'auto'
}
