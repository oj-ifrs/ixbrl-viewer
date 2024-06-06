// See COPYRIGHT.md for copyright information

export class QName {
    constructor(prefixMap, qname) {
        if (qname) {
            const a = qname.split(":", 2);
            this.localname = a[1];
            this.prefix = a[0];
            this.namespace = prefixMap[a[0]]; 
            this.qname = qname;
        } else {
            this.localname = null;
            this.prefix = null;
            this.namespace = null; 
            this.qname = null;
        }
    }
}

