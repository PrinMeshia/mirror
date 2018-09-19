import Config from '../config/conf.js';

const loadStyles = async (component, stylesheets) => {
    let arr = await Promise.all(stylesheets.map(url => fetch('src/modules/' + component + '/' + url)))
    arr = await Promise.all(arr.map(url => url.text()))
    const style = document.createElement('style')
    style.textContent = arr.reduce(
        (prev, fileContents) => prev + fileContents, ''
    )
    document.head.appendChild(style);
}
const loadModule = async (name, id) => {
    const moduleSpecifier = '../modules/' + name + '/script.js';
    const module = await import(moduleSpecifier);
    module.default(id);
}

window.onload = () => {
    Config.map(component => {
        let id = 'app_' + component.name;
        let componentElement = document.createElement("section");
        componentElement.className = "d-inline-flex p-2 align-self-stretch";
        componentElement.id = id;
        document.querySelector("#" + component.position + " .flex-row").appendChild(componentElement);
        loadStyles(component.name, component.styles !== undefined ? component.styles : []);
        loadModule(component.name, id);
    });
}