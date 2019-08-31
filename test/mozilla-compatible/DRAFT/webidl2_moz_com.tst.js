



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
    let tree = webidl2.parse(idl,{
        enableMozillaNamespacesConstants:true,
        enableMozillaBodylessInterface:true,
        enableMozillaAttributeSequence:true,
        ignoreMozillaUnrecognisedTokens:true
    })
    let s = JSON.stringify(tree)
    return(s)
}

function idl2d(idl){
    let s = idl2s(idl)
    let d = JSON.webidl2.parse(s,{
        enableMozillaNamespacesConstants:true,
        enableMozillaBodylessInterface:true,
        enableMozillaAttributeSequence:true,
        ignoreMozillaUnrecognisedTokens:true
    })
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
    let ERRMSG = {}
    for(let k in IDLS) {
        let fn = IDLS[k]
        try{
            let s = idlfn2s(fn)
            let jfn = "json/"+k+".json"
            JSONS[k] = jfn
            wfile(jfn,s)
        } catch (e) {
            ERRORS[k] = fn
            ERRMSG[k] = e
        }
    }
    return([JSONS,ERRORS,ERRMSG])
}


//cd /opt/JS/WEBIDL2-MOZILLA/webidl2.js/test/mozilla-compatible


var sh=require("shproperty")
var eded = require("exdict")
var elel = require("elist")
var lodash = require("lodash")
var webidl2 = require("../../dist/webidl2-mozilla-compatible.js");
var ERRORS = []
var JSONS =[]
var IDLS = rjson("webidl_dir.json")
var [JSONS,ERRORS,ERRMSG] = idls2json(IDLS)
ERRORS



function bareMessage() {
    let arr = ERRMSG.mapv2l(r=>r['bareMessage'])
    return(arr.uniqualize())
}

function findMessage(msg) {
    let arr = ERRMSG.mapv2l(r=>r['bareMessage'])
    return(arr.allIndexesOf(msg))
}


//ignore-unrecognised-tokens
ignoreMozillaUnrecognisedTokens

var tree = webidl2.parse(s,{
    enableMozillaNamespacesConstants:true,
    enableMozillaBodylessInterface:true,
    enableMozillaAttributeSequence:true,
    ignoreMozillaUnrecognisedTokens:true
})
var d = JSON.parse(JSON.stringify(tree))
d



const { parse, write, validate } = require("webidl2-mozilla-compatible");
