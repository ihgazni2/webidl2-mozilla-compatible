"use strict";

const fs = require("fs");
const webidl2 = require("../dist/webidl2.js");

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



/*test string*/
var s =`namespace APZHitResultFlags {
  const unsigned short INVISIBLE = 0;
};`


console.log(s)

var tree = webidl2.parse(s,{enableMozillaNamespacesConstants:true});
var d = JSON.parse(JSON.stringify(tree))
d

var txt = webidl2.write(tree);
console.log(txt)

/*test from a real file
 * https://dxr.mozilla.org/mozilla-central/source/dom/webidl/APZTestData.webidl
*/

var s  = rfile("APZTestData.webidl")
console.log(s)
var tree = webidl2.parse(s,{enableMozillaNamespacesConstants:true});
var d = JSON.parse(JSON.stringify(tree))
d

var txt = webidl2.write(tree);
console.log(txt)



/*
 * test all files from https://dxr.mozilla.org/mozilla-central/source/dom/webidl/
 */

function rjson(fn) {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    let d = JSON.parse(s)
    return(d)
}


function idl2s(idl){
    let tree = webidl2.parse(idl)
    let s = JSON.stringify(tree)
    return(s)
}

function idl2d(idl){
    let s = idl2s(idl)
    let d = JSON.webidl2.parse(s)
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


var IDLS = rsjon("webidl_dir.json")
var IDLS = rsjon("webidl_dir.json")
var [JSONS,ERRORS] = idls2json(IDLS)
ERRORS

