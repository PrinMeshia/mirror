import Config from '../config/conf.js';
async function loadStyles(component,stylesheets) {
    let arr = await Promise.all(stylesheets.map(url => fetch('src/modules/'+component+'/'+url)))
    console.log(arr);
    arr = await Promise.all(arr.map(url => url.text()))
    const style = document.createElement('style')
    style.textContent = arr.reduce(
        (prev, fileContents) => prev + fileContents, ''
    )
    document.head.appendChild(style);
}
window.onload = function () {
    Config.map(component => {
        console.log(component);
        let element = document.createElement("section");
        element.id = 'app_' + component.name;
        document.querySelector("#" + component.position + " .row").appendChild(element);
        loadStyles( component.name,component.styles !== undefined ? component.styles: []);
        (async () => {
            const moduleSpecifier = '../modules/' + component.name + '/script.js';
            const module = await import(moduleSpecifier)
            module.default(element.id);
        })();
    });
    
}

