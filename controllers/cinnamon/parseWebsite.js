// library dependencies
const axios = require('axios')
const { JSDOM } = require('jsdom')
const validateUrl = require('url-validator')

const getTextNodes = dom => {
    const body = dom.window.document.querySelector('body')
    const nodeFilter = dom.window.NodeFilter.SHOW_TEXT
    const walker = dom.window.document.createTreeWalker(body, nodeFilter, null, false)

    let n, a = []
    while (n = walker.nextNode()) {
        a.push(n)
    }
    return a
}

const getWebsiteText = async url => {
    const parsedUrl = validateUrl(url)
    if (!parsedUrl) {
        return null
    }
    try {
        const response = await axios.get(parsedUrl)
        const dom = new JSDOM(response.data)
        const text = getTextNodes(dom).map(node => node.textContent).join('\n')
        return text
    }
    catch (e) {
        console.log(e)
        throw e
    }
}


module.exports = getWebsiteText