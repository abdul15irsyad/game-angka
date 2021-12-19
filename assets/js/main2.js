document.addEventListener('DOMContentLoaded', () => {
    let listNumbers = [
        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99],
        [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 50, 51, 54, 55, 58, 59, 62, 63, 66, 67, 70, 71, 74, 75, 78, 79, 82, 83, 86, 87, 90, 91, 94, 95, 98, 99],
        [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63, 68, 69, 70, 71, 76, 77, 78, 79, 84, 85, 86, 87, 92, 93, 94, 95, 100],
        [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 58, 59, 60, 61, 62, 63, 72, 73, 74, 75, 76, 77, 78, 79, 88, 89, 90, 91, 92, 93, 94, 95],
        [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
        [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 96, 97, 98, 99, 100],
        [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    ]

    let number = 0, step = 0, totalSteps = 7

    let description = document.querySelector('.description')
    let btnStart = document.querySelector('.btn-start')

    let question = document.querySelector('.question')
    let listNumberWrapper = question.querySelector('.list-number-wrapper')
    let btnExist = question.querySelector('.btn-exist')
    let btnNotExist = question.querySelector('.btn-not-exist')

    let loading = document.querySelector('.loading')
    let result = document.querySelector('.result')
    let resultNumber = result.querySelector('.result-number')
    let error = document.querySelector('.error')
    let btnRestarts = document.querySelectorAll('.btn-restart')

    btnStart.addEventListener('click', async function () {
        description.style.display = 'none'
        question.style.display = 'block'
        this.style.display = 'none'
        step = 1
        await doStep(step)
    })

    btnExist.addEventListener('click', async () => {
        addResult(step, true)
        step++
        await doStep(step)
    })

    btnNotExist.addEventListener('click', async () => {
        addResult(step, false)
        step++
        await doStep(step)
    })

    btnRestarts.forEach(btnRestart => {
        btnRestart.addEventListener('click', () => {
            number = 0
            step = 0
            error.style.display = 'none'
            result.style.display = 'none'
            description.style.display = 'block'
            btnStart.style.display = 'inline-block'
        })
    })

    let doStep = async step => {
        clearListNumberWrapper()
        if (step <= totalSteps) {
            await showListNumber(step)
        } else {
            showResult()
        }
    }

    let showListNumber = async step => {
        for await (let numberItem of listNumbers[step - 1]) {
            let numberItemContainer = document.createElement('div')
            numberItemContainer.classList.add('list-number-item')
            numberItemContainer.textContent = numberItem
            listNumberWrapper.appendChild(numberItemContainer)
        }
    }

    let clearListNumberWrapper = () => {
        listNumberWrapper.innerHTML = ''
    }

    let addResult = (step, exist) => {
        number += exist ? listNumbers[step - 1][0] : 0
    }

    let showResult = () => {
        question.style.display = 'none'
        loading.style.display = 'block'
        setTimeout(() => {
            loading.style.display = 'none'
            if (number >= 1 && number <= 100) {
                result.style.display = 'block'
                resultNumber.textContent = number
            } else {
                error.style.display = 'block'
            }
        }, 1000)
    }

})
