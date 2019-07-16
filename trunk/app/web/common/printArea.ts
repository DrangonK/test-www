const removePrintArea = (id: string) => {
    // document.getElementById(id).remove();
}
let printAreaCount = 0
export const printArea = (resTitle: string, html: string) => {
    const idPrefix = 'printArea_'
    const title = document.title
    removePrintArea(idPrefix + printAreaCount)
    printAreaCount++
    const iframeId = idPrefix + printAreaCount
    const iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;background:#fff;'
    const iframe = document.createElement('IFRAME')
    iframe.id = iframeId
    iframe.setAttribute('style', iframeStyle)
    document.title = resTitle
    document.body.appendChild(iframe)
    // @ts-ignore
    const doc = iframe.contentWindow.document
    doc.open()
    doc.write('<head><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta charset="utf-8"><title>' + resTitle + '</title>')
    const links = document.getElementsByTagName('link')
    const styles = document.getElementsByTagName('style')
    const len = links.length
    const len2 = links.length
    for (let i = 0; i < len; i++) {
        const link = links[i]
        doc.write('<link rel="stylesheet" type="text/css" href="' + link.href + '">')
    }
    for (let i = 0; i < len2; i++) {
        const style = styles[i]
        if (style) {
            doc.write(style.outerHTML)
        }
    }
    doc.write('</head>')
    // doc.write('<body class="print" style="background-color: #fff;"><table width="800" border="0" align="center" cellpadding="0" cellspacing="0" class="wrap"><tr><td>' + html + '</td></tr></table></body>')
    doc.write('<body class="print" style="background-color: #fff;padding:4px">' + html + '</body>')
    doc.close()
    // @ts-ignore
    const printWindow = iframe.contentWindow
    printWindow.focus()
    setTimeout(() => {
        printWindow.print()
        document.title = title
    }, 1000)
}
