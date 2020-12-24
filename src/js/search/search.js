const Search = () => { 
    function tableSearch() {
        const table = document.querySelector('.tableTwo');
        const regExp = new RegExp(word.value, 'i');
        console.log(word.value)
        let flag = false;
        for (let i = 0; i < table.tBodies[0].rows.length; i += 1) {
            flag = false;
            for (let j = table.tBodies[0].rows[i].cells.length - 1; j >= 0; j -= 1) {
                flag = regExp.test(table.tBodies[0].rows[i].cells[1].textContent);
                if (flag) break;
            }
            if (flag) {
                table.tBodies[0].rows[i].style.display = '';
            
            } else {
                table.tBodies[0].rows[i].style.display = 'none';
            }
        }
    }
    const word = document.querySelector('.search__form');
    word.addEventListener('keyup', tableSearch);
    const button = document.querySelector('.search__clear');
    button.addEventListener('click', () => {
        word.value = '';
        const arrRows = Array.from(document.querySelector('.tableTwo').tBodies[0].rows);
        arrRows.forEach(item => {
            item.style.display = '';
        })
    })

}

export default Search;