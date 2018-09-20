class atom {
    constructor(id) {
        document.querySelector("#" + id).innerHTML = "<div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>";
    }
}
export default (id) => {new atom(id)};
