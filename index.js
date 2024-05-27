const options = [{
    label: 'Витебск',
    value: 2,
    group: 'Первая'
},
{
    label: 'Могилев',
    value: 6,
    group: 'Первая'
},
{
    label: 'Гомель',
    value: 3,
    group: 'Вторая'
},
{
    label: 'Брест',
    value: 1,
    group: 'Вторая'
},
{
    label: 'Гродно',
    value: 4,
    group: 'Третья'
},
{
    label: 'Минск',
    value: 7
}, 
{
    label: 'Орша',
    value: 8,
    group: 'Первая'
}
]

class Select {
    constructor(selector, options, width) {
        this.$select = document.querySelector(selector);
        this.options = options;
        this.$select.style.setProperty('--selected-width', width);
        this.$label = document.querySelector('.select__label');
        this.$dropDown = document.querySelector('.select__drop-down');

        // this.itemsForDropDown = this.options.map(({label, value}) => {
        //     return `<li data-id=${value}>${label}</li>`
        // }).join('')

        this.itemsForDropDown = this.initGroup(this.options).map(([key, items]) => {
            if(key) {

                const groupList = items.map (({label, value}) => {
                    return  `<li data-id=${value}>${label}</li>`
                }).join('')
                console.log(groupList);

                return `<ul style="padding:8px"><span style="color:gray">${key}</span>${groupList}</ul>`

            } else {
                return items.map(({label, value}) => {
                  return  `<li data-id=${value}>${label}</li>`
                }).join('')
            }
        }).join('')

        this.$dropDown.insertAdjacentHTML('afterbegin', this.itemsForDropDown)

        this.$select.addEventListener('click', (e) => {                // контекст того лекс. окружения, где она создана
            console.log(e.target);
            console.log(e.target.tagName);
            // console.log(e.target.classList);
            
            if(e.target.classList.contains('select__label')) {
                console.log('ты кликнул на label');  

                // if (this.$select.classList.contains('active')) {
                //     this.close()
                // } else {
                //     this.open()
                // }

                this.$select.classList.toggle('active')

            } else {
                if (e.target.tagName.toLowerCase() ==='li') {
                    console.log('ты кликнул на li');
                    console.log(e.target.dataset.id);
                    this.selectItem(+e.target.dataset.id);
                    this.close()
                }
            }
        })
    }

    selectItem(id) {
        const selectedElement = this.options.find(item => item.value === id)
        this.$label.innerHTML = selectedElement.label
    }

    open() {
        this.$select.classList.add('active')
    }

    close() {
        this.$select.classList.remove('active')
    }

    initGroup(items) {
            const group = new Map()
            console.log('group', group);
        
            items.forEach((item) => {
                // console.log(item);
                if (!group.has(item.group)) {
                    group.set(item.group, [item])
                } else {
                    group.set(item.group, [...group.get(item.group), item])
                }
            })
        
            // console.log(Array.from(group.keys()));
            // console.log(Array.from(group.values()));
            // console.log(Array.from(group.entries()));
        
            return Array.from(group.entries()) 
    }
}

const customSelect = new Select('.select', options, '350px')

console.log(customSelect);
// console.log(customSelect.$label);
// console.log(customSelect.$dropDown);