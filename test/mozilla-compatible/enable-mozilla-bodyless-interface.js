



function rfile(fn) {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    return(s)
}

function rjson(fn) {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    let d = JSON.parse(s)
    return(d)
}

function idl2s(idl){
    let tree = webidl2.parse(idl,{enableMozillaNamespacesConstants:true})
    let s = JSON.stringify(tree)
    return(s)
}

function idl2d(idl){
    let s = idl2s(idl)
    let d = JSON.webidl2.parse(s,{enableMozillaNamespacesConstants:true})
    return(d)
}

function idlfn2s(fn) {
    let idl = rfile(fn)
    let s = idl2s(idl)
    return(s)
}

function idlfn2d(fn) {
    let idl = rfile(fn)
    let d = idl2d(idl)
    return(d)
}

function wfile(fn,s) {
    fs.writeFileSync(fn,s)
}


function idls2json(IDLS) {
    let JSONS = {}
    let ERRORS ={};
    for(let k in IDLS) {
        let fn = IDLS[k]
        try{
            let s = idlfn2s(fn)
            let jfn = "json/"+k+".json"
            JSONS[k] = jfn
            wfile(jfn,s)
        } catch (e) {
            ERRORS[k] = fn
        }
    }
    return([JSONS,ERRORS])
}

var IDLS = rjson("webidl_dir.json")
var [JSONS,ERRORS] = idls2json(IDLS)
ERRORS


Object.prototype.seq = function (seq) {
    let ks = this.keys()
    let k = ks[seq]
    return(this[k])
}


var webidl2 = require("../../dist/webidl2-mozilla-compatible.js");
var s ="interface MozObserver;"
var tree = webidl2.parse(s,{enableMozillaBodylessInterface:true})
var d = JSON.parse(JSON.stringify(tree))
d
