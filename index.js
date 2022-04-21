const userData = document.getElementById('user-input')
const searchResultList = document.getElementById('search-list');
const userChoiceList = document.getElementById('user-choice-list')

userData.addEventListener('keyup', debounce(() => {
    clearList(searchResultList)
    searchRepo(userData.value)

}, 230))


function searchRepo(value) {
    if (!value) {
        clearList(searchResultList);
    } else {
        try {
            userRequest(value)
        } catch (e) {
            console.log('Error fetch' + e)
        }

    }
};

async function userRequest(searchWord) {
    return await fetch(`https://api.github.com/search/repositories?q=${searchWord}&per_page=5`).then((res) => {
        res.json().then(res => {
            res.items.forEach((el) => {
                const userListItem = createElement('li', 'search-list_item', `${el.full_name}`)
                userListItem.addEventListener('click', () => {
                    const userChoiseItem = createElement('div', 'user-choice-list_item')
                    userChoiseItem.innerHTML = `
                                <div><span>Name: ${el.name}</span> </br>
                                <span>Owner: ${el.owner.login}</span> </br>
                                <span>Stars: ${el.stargazers_count}</span></div>
                                <button class="buton-close">X</button>`
                    userChoiseItem.addEventListener('click', (el) => {
                        el.target.closest('div').remove()
                    })
                    userChoiceList.append(userChoiseItem)

                })
                searchResultList.append(userListItem)

            })
        })
    })
}

function createElement(elementTag, elementClass, innerText) {
    const element = document.createElement(elementTag);
    if (elementClass) {
        element.classList.add(elementClass);
    }
    if (innerText) {
        element.innerHTML = innerText
    }
    return element
}

function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

function clearList(namelist) {
    namelist.innerHTML = '';
}