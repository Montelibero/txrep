import {jsx as $kdgky$jsx, jsxs as $kdgky$jsxs} from "react/jsx-runtime";
import "babel-polyfill";
import {Component as $kdgky$Component} from "react";
import {render as $kdgky$render} from "react-dom";
import {AppBar as $kdgky$AppBar, Tabs as $kdgky$Tabs, Tab as $kdgky$Tab, withStyles as $kdgky$withStyles, Typography as $kdgky$Typography, TextField as $kdgky$TextField} from "@material-ui/core";
import {createMuiTheme as $kdgky$createMuiTheme, ThemeProvider as $kdgky$ThemeProvider} from "@material-ui/core/styles";
import {Networks as $kdgky$Networks, Transaction as $kdgky$Transaction, StrKey as $kdgky$StrKey, Account as $kdgky$Account, TransactionBuilder as $kdgky$TransactionBuilder, TimeoutInfinite as $kdgky$TimeoutInfinite, Operation as $kdgky$Operation, xdr as $kdgky$xdr, Asset as $kdgky$Asset, Memo as $kdgky$Memo} from "@stellar/stellar-sdk";
import $kdgky$bignumberjs from "bignumber.js";
import {Buffer as $kdgky$Buffer} from "buffer";











const $fa0170503e47de5f$var$theme = (0, $kdgky$createMuiTheme)({
    palette: {
        text: {
            primary: "#111320",
            secondary: "#576789"
        },
        primary: {
            main: "#0607ac"
        },
        secondary: {
            contrastText: "#FFF",
            main: "#fb8313"
        },
        background: {
            default: "#f2f7ff"
        }
    }
});
class $fa0170503e47de5f$export$2e2bcd8739ae039 extends $kdgky$Component {
    render() {
        return /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$ThemeProvider), {
            theme: $fa0170503e47de5f$var$theme,
            children: this.props.children
        });
    }
}








// taken from https://github.com/stellar/js-stellar-base/blob/714b214044628939f3cf22981772d5e7d7eaa947/src/util/continued_fraction.js
/* tslint:disable */ 
const $340bd9442ecc988e$var$MAX_INT = 2147483647;
function $340bd9442ecc988e$export$70808fcaed13f7d9(rawNumber) {
    let number = new (0, $kdgky$bignumberjs)(rawNumber);
    let a;
    let f;
    const fractions = [
        [
            new (0, $kdgky$bignumberjs)(0),
            new (0, $kdgky$bignumberjs)(1)
        ],
        [
            new (0, $kdgky$bignumberjs)(1),
            new (0, $kdgky$bignumberjs)(0)
        ]
    ];
    let i = 2;
    // eslint-disable-next-line no-constant-condition
    while(true){
        if (number.gt($340bd9442ecc988e$var$MAX_INT)) break;
        a = number.floor();
        f = number.sub(a);
        const h = a.mul(fractions[i - 1][0]).add(fractions[i - 2][0]);
        const k = a.mul(fractions[i - 1][1]).add(fractions[i - 2][1]);
        if (h.gt($340bd9442ecc988e$var$MAX_INT) || k.gt($340bd9442ecc988e$var$MAX_INT)) break;
        fractions.push([
            h,
            k
        ]);
        if (f.eq(0)) break;
        number = new (0, $kdgky$bignumberjs)(1).div(f);
        i += 1;
    }
    const [n, d] = fractions[fractions.length - 1];
    if (n.isZero() || d.isZero()) throw new Error("Couldn't find approximation");
    return [
        n.toNumber(),
        d.toNumber()
    ];
}
function $340bd9442ecc988e$export$adaa4cf7ef1b65be(obj, path, value) {
    if (Object(obj) !== obj) return obj; // When obj is not an object
    // If not yet an array, get the keys from the string-path
    if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
    path.slice(0, -1).reduce((a, c, i)=>Object(a[c]) === a[c] // Does the key exist and is its value an object?
         ? a[c] : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] // Yes: assign a new array object
         : {}, obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
    return obj; // Return the top-level object to allow chaining
}
function $340bd9442ecc988e$export$40a6f364ca925880(str) {
    if (!str) return "";
    return String(str).replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "").replace(/([a-z])([A-Z])/g, (_m, a, b)=>a + "_" + b.toLowerCase()).replace(/[^A-Za-z0-9]+|_+/g, "_").toUpperCase();
}


function $2aea750bec1a9578$export$77ccd3b555764565(transaction) {
    const lines = [];
    if (transaction instanceof (0, $kdgky$Transaction)) {
        $2aea750bec1a9578$var$addLine("tx.sourceAccount", transaction.source, lines);
        $2aea750bec1a9578$var$addLine("tx.fee", transaction.fee, lines);
        $2aea750bec1a9578$var$addLine("tx.seqNum", transaction.sequence, lines);
        $2aea750bec1a9578$var$addTimeBounds(transaction.timeBounds, lines);
        $2aea750bec1a9578$var$addMemo(transaction.memo, lines);
        $2aea750bec1a9578$var$addOperations(transaction.operations, lines);
        $2aea750bec1a9578$var$addLine("tx.ext.v", 0, lines);
    }
    $2aea750bec1a9578$var$addSignatures(transaction.signatures, lines);
    return lines.join("\n");
}
function $2aea750bec1a9578$var$addLine(key, value, lines) {
    if (value !== undefined) lines.push(`${key}: ${value}`);
}
function $2aea750bec1a9578$var$addTimeBounds(timeBounds, lines) {
    if (timeBounds != null) {
        $2aea750bec1a9578$var$addLine("tx.timeBounds._present", true, lines);
        $2aea750bec1a9578$var$addLine("tx.timeBounds.minTime", timeBounds.minTime, lines);
        $2aea750bec1a9578$var$addLine("tx.timeBounds.maxTime", timeBounds.maxTime, lines);
    } else $2aea750bec1a9578$var$addLine("tx.timeBounds._present", false, lines);
}
function $2aea750bec1a9578$var$addMemo(memo, lines) {
    switch(memo.type){
        case "none":
            $2aea750bec1a9578$var$addLine("tx.memo.type", "MEMO_NONE", lines);
            return;
        case "text":
            $2aea750bec1a9578$var$addLine("tx.memo.type", "MEMO_TEXT", lines);
            $2aea750bec1a9578$var$addLine("tx.memo.text", JSON.stringify(memo.value.toString("utf-8")), lines);
            return;
        case "id":
            $2aea750bec1a9578$var$addLine("tx.memo.type", "MEMO_ID", lines);
            $2aea750bec1a9578$var$addLine("tx.memo.id", memo.value, lines);
            return;
        case "hash":
            $2aea750bec1a9578$var$addLine("tx.memo.type", "MEMO_HASH", lines);
            $2aea750bec1a9578$var$addLine("tx.memo.hash", $2aea750bec1a9578$var$toOpaque(memo.value), lines);
            return;
        case "return":
            $2aea750bec1a9578$var$addLine("tx.memo.type", "MEMO_RETURN", lines);
            $2aea750bec1a9578$var$addLine("tx.memo.retHash", $2aea750bec1a9578$var$toOpaque(memo.value), lines);
            return;
    }
}
function $2aea750bec1a9578$var$addOperations(operations, lines) {
    $2aea750bec1a9578$var$addLine("tx.operations.len", operations.length, lines);
    operations.forEach((operation, i)=>{
        $2aea750bec1a9578$var$addOperation(operation, i, lines);
    });
}
function $2aea750bec1a9578$var$addOperation(operation, i, lines) {
    const prefix = `tx.operations[${i}]`;
    const addOpLine = (k, v)=>$2aea750bec1a9578$var$addLine(`${prefix}.${k}`, v, lines);
    if (operation.source) {
        addOpLine("sourceAccount._present", true);
        addOpLine("sourceAccount", operation.source);
    } else addOpLine("sourceAccount._present", false);
    const type = (0, $340bd9442ecc988e$export$40a6f364ca925880)(operation.type);
    addOpLine("body.type", type);
    const addBodyLine = (k, v, optional = false)=>{
        const key = `body.${operation.type}Op.${k}`;
        if (optional) {
            const present = v !== null && v !== undefined;
            addOpLine(`${key}._present`, present);
            if (present) addOpLine(key, v);
        } else addOpLine(key, v);
    };
    switch(operation.type){
        case "createAccount":
            $2aea750bec1a9578$var$addCreateAccountOperation(operation, addBodyLine);
            return;
        case "payment":
            $2aea750bec1a9578$var$addPaymentOperation(operation, addBodyLine);
            return;
        case "pathPaymentStrictReceive":
            $2aea750bec1a9578$var$addPathPaymentStrictReceiveOp(operation, addBodyLine);
            return;
        case "pathPaymentStrictSend":
            $2aea750bec1a9578$var$addPathPaymentStrictSendOp(operation, addBodyLine);
            return;
        case "manageSellOffer":
            $2aea750bec1a9578$var$addManageSellOfferOp(operation, addBodyLine);
            return;
        case "createPassiveSellOffer":
            $2aea750bec1a9578$var$addCreatePassiveSellOfferOp(operation, addBodyLine);
            return;
        case "setOptions":
            $2aea750bec1a9578$var$addSetOptionsOp(operation, addBodyLine);
            return;
        case "changeTrust":
            $2aea750bec1a9578$var$addChangeTrustOp(operation, addBodyLine);
            return;
        case "allowTrust":
            $2aea750bec1a9578$var$addAllowTrustOp(operation, addBodyLine);
            return;
        case "accountMerge":
            $2aea750bec1a9578$var$addAccountMergeOp(operation, addOpLine);
            return;
        case "manageData":
            $2aea750bec1a9578$var$addManageDataOp(operation, addBodyLine);
            return;
        case "bumpSequence":
            $2aea750bec1a9578$var$addBumpSequenceOp(operation, addBodyLine);
            return;
        case "manageBuyOffer":
            $2aea750bec1a9578$var$addManageBuyOfferOp(operation, addBodyLine);
            return;
        default:
            throw Error(`${operation.type} is not implemented`);
    }
}
function $2aea750bec1a9578$var$addCreateAccountOperation(operation, addBodyLine) {
    addBodyLine("destination", operation.destination);
    addBodyLine("startingBalance", $2aea750bec1a9578$var$toAmount(operation.startingBalance));
}
function $2aea750bec1a9578$var$addPaymentOperation(operation, addBodyLine) {
    addBodyLine("destination", operation.destination);
    addBodyLine("asset", $2aea750bec1a9578$var$toAsset(operation.asset));
    addBodyLine("amount", $2aea750bec1a9578$var$toAmount(operation.amount));
}
function $2aea750bec1a9578$var$addPathPaymentStrictReceiveOp(operation, addBodyLine) {
    addBodyLine("sendAsset", $2aea750bec1a9578$var$toAsset(operation.sendAsset));
    addBodyLine("sendMax", $2aea750bec1a9578$var$toAmount(operation.sendMax));
    addBodyLine("destination", operation.destination);
    addBodyLine("destAsset", $2aea750bec1a9578$var$toAsset(operation.destAsset));
    addBodyLine("destAmount", $2aea750bec1a9578$var$toAmount(operation.destAmount));
    addBodyLine("path.len", operation.path.length);
    operation.path.forEach((asset, i)=>{
        addBodyLine(`path[${i}]`, $2aea750bec1a9578$var$toAsset(asset));
    });
}
function $2aea750bec1a9578$var$addPathPaymentStrictSendOp(operation, addBodyLine) {
    addBodyLine("sendAsset", $2aea750bec1a9578$var$toAsset(operation.sendAsset));
    addBodyLine("sendAmount", $2aea750bec1a9578$var$toAmount(operation.sendAmount));
    addBodyLine("destination", operation.destination);
    addBodyLine("destAsset", $2aea750bec1a9578$var$toAsset(operation.destAsset));
    addBodyLine("destMin", $2aea750bec1a9578$var$toAmount(operation.destMin));
    addBodyLine("path.len", operation.path.length);
    operation.path.forEach((asset, i)=>{
        addBodyLine(`path[${i}]`, $2aea750bec1a9578$var$toAsset(asset));
    });
}
function $2aea750bec1a9578$var$addManageSellOfferOp(operation, addBodyLine) {
    addBodyLine("selling", $2aea750bec1a9578$var$toAsset(operation.selling));
    addBodyLine("buying", $2aea750bec1a9578$var$toAsset(operation.buying));
    addBodyLine("amount", $2aea750bec1a9578$var$toAmount(operation.amount));
    $2aea750bec1a9578$var$addPrice(operation.price, addBodyLine);
    addBodyLine("offerID", operation.offerId);
}
function $2aea750bec1a9578$var$addCreatePassiveSellOfferOp(operation, addBodyLine) {
    addBodyLine("selling", $2aea750bec1a9578$var$toAsset(operation.selling));
    addBodyLine("buying", $2aea750bec1a9578$var$toAsset(operation.buying));
    addBodyLine("amount", $2aea750bec1a9578$var$toAmount(operation.amount));
    $2aea750bec1a9578$var$addPrice(operation.price, addBodyLine);
}
function $2aea750bec1a9578$var$addSetOptionsOp(operation, addBodyLine) {
    addBodyLine("inflationDest", operation.inflationDest, true);
    addBodyLine("clearFlags", operation.clearFlags, true);
    addBodyLine("setFlags", operation.setFlags, true);
    addBodyLine("masterWeight", operation.masterWeight, true);
    addBodyLine("lowThreshold", operation.lowThreshold, true);
    addBodyLine("medThreshold", operation.medThreshold, true);
    addBodyLine("highThreshold", operation.highThreshold, true);
    addBodyLine("homeDomain", $2aea750bec1a9578$var$toString(operation.homeDomain), true);
    $2aea750bec1a9578$var$addSigner(operation.signer, addBodyLine);
}
function $2aea750bec1a9578$var$addPrice(price, addBodyLine) {
    const [n, d] = (0, $340bd9442ecc988e$export$70808fcaed13f7d9)(price);
    addBodyLine("price.n", n);
    addBodyLine("price.d", d);
}
function $2aea750bec1a9578$var$addSigner(signer, addBodyLine) {
    addBodyLine("signer._present", !!signer);
    if (signer) {
        if (signer.ed25519PublicKey) addBodyLine("signer.key", signer.ed25519PublicKey);
        else if (signer.preAuthTx) addBodyLine("signer.key", (0, $kdgky$StrKey).encodePreAuthTx(signer.preAuthTx));
        else if (signer.sha256Hash) addBodyLine("signer.key", (0, $kdgky$StrKey).encodeSha256Hash(signer.sha256Hash));
        addBodyLine("signer.weight", signer.weight);
    }
}
function $2aea750bec1a9578$var$addChangeTrustOp(operation, addBodyLine) {
    addBodyLine("line", $2aea750bec1a9578$var$toAsset(operation.line));
    if (operation.limit) addBodyLine("limit", $2aea750bec1a9578$var$toAmount(operation.limit));
}
function $2aea750bec1a9578$var$addAllowTrustOp(operation, addBodyLine) {
    addBodyLine("trustor", operation.trustor);
    addBodyLine("asset", operation.assetCode);
    addBodyLine("authorize", operation.authorize);
}
function $2aea750bec1a9578$var$addAccountMergeOp(operation, addOpLine) {
    // account merge does not include 'accountMergeOp' prefix
    addOpLine("body.destination", operation.destination);
}
function $2aea750bec1a9578$var$addManageDataOp(operation, addBodyLine) {
    addBodyLine("dataName", $2aea750bec1a9578$var$toString(operation.name));
    addBodyLine("dataValue._present", !!operation.value);
    if (operation.value) addBodyLine("dataValue", $2aea750bec1a9578$var$toOpaque(operation.value));
}
function $2aea750bec1a9578$var$addBumpSequenceOp(operation, addBodyLine) {
    addBodyLine("bumpTo", operation.bumpTo);
}
function $2aea750bec1a9578$var$addManageBuyOfferOp(operation, addBodyLine) {
    addBodyLine("selling", $2aea750bec1a9578$var$toAsset(operation.selling));
    addBodyLine("buying", $2aea750bec1a9578$var$toAsset(operation.buying));
    addBodyLine("buyAmount", $2aea750bec1a9578$var$toAmount(operation.buyAmount));
    $2aea750bec1a9578$var$addPrice(operation.price, addBodyLine);
    addBodyLine("offerID", operation.offerId);
}
function $2aea750bec1a9578$var$addSignatures(signatures, lines) {
    $2aea750bec1a9578$var$addLine("signatures.len", signatures.length, lines);
    signatures.forEach((signature, i)=>{
        $2aea750bec1a9578$var$addSignature(signature, i, lines);
    });
}
function $2aea750bec1a9578$var$addSignature(signature, i, lines) {
    const prefix = `signatures[${i}]`;
    $2aea750bec1a9578$var$addLine(`${prefix}.hint`, $2aea750bec1a9578$var$toOpaque(signature.hint()), lines);
    $2aea750bec1a9578$var$addLine(`${prefix}.signature`, $2aea750bec1a9578$var$toOpaque(signature.signature()), lines);
}
function $2aea750bec1a9578$var$toAsset(asset) {
    if (asset.isNative()) return "XLM";
    return `${asset.code}:${asset.issuer}`;
}
function $2aea750bec1a9578$var$toAmount(amount) {
    return new (0, $kdgky$bignumberjs)(amount).times(10000000);
}
function $2aea750bec1a9578$var$toString(value) {
    return JSON.stringify(value);
}
function $2aea750bec1a9578$var$toOpaque(value) {
    return value.toString("hex");
}






var $1c5a2c3f8fdb36b2$require$Buffer = $kdgky$Buffer;
function $1c5a2c3f8fdb36b2$export$9f69daeb64c04e5e(txrep, networkPassphrase) {
    const obj = $1c5a2c3f8fdb36b2$export$485ec5ac1594c47e(txrep);
    const seq = new (0, $kdgky$bignumberjs)(obj.tx.seqNum);
    const account = new (0, $kdgky$Account)(obj.tx.sourceAccount, seq.minus(1).toString());
    const opts = {
        memo: $1c5a2c3f8fdb36b2$var$toMemo(obj.tx.memo),
        fee: $1c5a2c3f8fdb36b2$var$toFee(obj.tx.fee),
        timebounds: $1c5a2c3f8fdb36b2$var$toTimebounds(obj.tx.timeBounds),
        networkPassphrase: networkPassphrase
    };
    const builder = new (0, $kdgky$TransactionBuilder)(account, opts);
    if (!opts.timebounds) builder.setTimeout((0, $kdgky$TimeoutInfinite));
    for (const operation of obj.tx.operations)builder.addOperation($1c5a2c3f8fdb36b2$var$toOperation(operation));
    const transaction = builder.build();
    if (obj.signatures) for (const signature of obj.signatures)transaction.signatures.push($1c5a2c3f8fdb36b2$var$toSignature(signature));
    return transaction;
}
function $1c5a2c3f8fdb36b2$export$485ec5ac1594c47e(txrep) {
    const obj = {};
    const fields = txrep.split("\n").map((line)=>line.trim()).filter((l)=>!!l).map($1c5a2c3f8fdb36b2$export$201cf590763ee847);
    fields.forEach(({ path: path, value: value })=>{
        // meta-attributes will mess up arrays if converted directly to an object, so ignore them
        if (!path || !$1c5a2c3f8fdb36b2$var$isMetaAttribute(path)) (0, $340bd9442ecc988e$export$adaa4cf7ef1b65be)(obj, path, value);
    });
    return obj;
}
function $1c5a2c3f8fdb36b2$var$isMetaAttribute(path) {
    const paths = path.split(".");
    const field = paths[paths.length - 1];
    return field === "len" || field.startsWith("_");
}
function $1c5a2c3f8fdb36b2$export$201cf590763ee847(line) {
    const [path, remainingLine] = $1c5a2c3f8fdb36b2$var$getPath(line);
    const [value, comment] = $1c5a2c3f8fdb36b2$var$getValue(remainingLine);
    return {
        path: path,
        value: $1c5a2c3f8fdb36b2$var$parseValue(value),
        comment: comment
    };
}
function $1c5a2c3f8fdb36b2$var$getPath(line) {
    const colonPos = line.indexOf(":");
    const path = line.slice(0, colonPos).trim();
    const rest = line.slice(colonPos + 1).trim();
    return [
        path,
        rest
    ];
}
function $1c5a2c3f8fdb36b2$var$getValue(line) {
    if (line[0] === '"') return $1c5a2c3f8fdb36b2$var$getStringValue(line);
    else return $1c5a2c3f8fdb36b2$var$getNonStringValue(line);
}
function $1c5a2c3f8fdb36b2$var$getStringValue(line) {
    let value = '"';
    let inEscapeSequence = false;
    let i = 1;
    for(; i < line.length; ++i){
        const char = line[i];
        if (inEscapeSequence) {
            // newline
            if (char === "n") value += "\n";
            else value += char;
            inEscapeSequence = false;
        } else if (char === "\\") inEscapeSequence = true;
        else if (char === '"') {
            // end of string
            value += char;
            break;
        } else value += char;
    }
    return [
        value.trim(),
        line.slice(i + 1).trim()
    ];
}
function $1c5a2c3f8fdb36b2$var$getNonStringValue(line) {
    const spacePos = line.indexOf(" ");
    if (spacePos === -1) return [
        line.trim(),
        ""
    ];
    else {
        const value = line.slice(0, spacePos);
        const rest = line.slice(spacePos);
        return [
            value.trim(),
            rest.trim()
        ];
    }
}
function $1c5a2c3f8fdb36b2$var$parseValue(value) {
    if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
}
function $1c5a2c3f8fdb36b2$var$toFee(value) {
    return value;
}
function $1c5a2c3f8fdb36b2$var$toOperation({ sourceAccount: sourceAccount, body: body }) {
    switch(body.type){
        case "CREATE_ACCOUNT":
            return $1c5a2c3f8fdb36b2$var$toCreateAccountOperation(body.createAccountOp, sourceAccount);
        case "PAYMENT":
            return $1c5a2c3f8fdb36b2$var$toPaymentOperation(body.paymentOp, sourceAccount);
        case "PATH_PAYMENT_STRICT_RECEIVE":
            return $1c5a2c3f8fdb36b2$var$toPathPaymentStrictReceive(body.pathPaymentStrictReceiveOp, sourceAccount);
        case "PATH_PAYMENT_STRICT_SEND":
            return $1c5a2c3f8fdb36b2$var$toPathPaymentStrictSend(body.pathPaymentStrictSendOp, sourceAccount);
        case "MANAGE_SELL_OFFER":
            return $1c5a2c3f8fdb36b2$var$toManageSellOffer(body.manageSellOfferOp, sourceAccount);
        case "CREATE_PASSIVE_SELL_OFFER":
            return $1c5a2c3f8fdb36b2$var$toCreatePassiveSellOffer(body.createPassiveSellOfferOp, sourceAccount);
        case "SET_OPTIONS":
            return $1c5a2c3f8fdb36b2$var$toSetOptions(body.setOptionsOp, sourceAccount);
        case "CHANGE_TRUST":
            return $1c5a2c3f8fdb36b2$var$toChangeTrust(body.changeTrustOp, sourceAccount);
        case "ALLOW_TRUST":
            return $1c5a2c3f8fdb36b2$var$toAllowTrust(body.allowTrustOp, sourceAccount);
        case "ACCOUNT_MERGE":
            // ACCOUNT_MERGE does not have a nested op in it
            return $1c5a2c3f8fdb36b2$var$toAccountMerge(body, sourceAccount);
        case "MANAGE_DATA":
            return $1c5a2c3f8fdb36b2$var$toManageData(body.manageDataOp, sourceAccount);
        case "BUMP_SEQUENCE":
            return $1c5a2c3f8fdb36b2$var$toBumpSequence(body.bumpSequenceOp, sourceAccount);
        case "MANAGE_BUY_OFFER":
            return $1c5a2c3f8fdb36b2$var$toManageBuyOffer(body.manageBuyOfferOp, sourceAccount);
        default:
            throw new Error("Not implemented");
    }
}
function $1c5a2c3f8fdb36b2$var$toCreateAccountOperation(op, source) {
    const { destination: destination, startingBalance: startingBalance } = op;
    return (0, $kdgky$Operation).createAccount({
        destination: destination,
        startingBalance: $1c5a2c3f8fdb36b2$var$toAmount(startingBalance),
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toPaymentOperation(op, source) {
    const { asset: asset, destination: destination, amount: amount } = op;
    return (0, $kdgky$Operation).payment({
        destination: destination,
        asset: $1c5a2c3f8fdb36b2$var$toAsset(asset),
        amount: $1c5a2c3f8fdb36b2$var$toAmount(amount),
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toPathPaymentStrictReceive(op, source) {
    const { sendAsset: sendAsset, destAsset: destAsset, sendMax: sendMax, destination: destination, destAmount: destAmount, path: path } = op;
    return (0, $kdgky$Operation).pathPaymentStrictReceive({
        sendAsset: $1c5a2c3f8fdb36b2$var$toAsset(sendAsset),
        sendMax: $1c5a2c3f8fdb36b2$var$toAmount(sendMax),
        destination: destination,
        destAsset: $1c5a2c3f8fdb36b2$var$toAsset(destAsset),
        destAmount: $1c5a2c3f8fdb36b2$var$toAmount(destAmount),
        path: path && path.map($1c5a2c3f8fdb36b2$var$toAsset),
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toPathPaymentStrictSend(op, source) {
    const { sendAsset: sendAsset, sendAmount: sendAmount, destAsset: destAsset, destination: destination, destMin: destMin, path: path } = op;
    return (0, $kdgky$Operation).pathPaymentStrictSend({
        sendAsset: $1c5a2c3f8fdb36b2$var$toAsset(sendAsset),
        sendAmount: $1c5a2c3f8fdb36b2$var$toAmount(sendAmount),
        destination: destination,
        destAsset: $1c5a2c3f8fdb36b2$var$toAsset(destAsset),
        destMin: $1c5a2c3f8fdb36b2$var$toAmount(destMin),
        path: path && path.map($1c5a2c3f8fdb36b2$var$toAsset),
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toManageSellOffer(op, source) {
    const { selling: selling, buying: buying, amount: amount, price: price, offerID: offerID } = op;
    return (0, $kdgky$Operation).manageSellOffer({
        selling: $1c5a2c3f8fdb36b2$var$toAsset(selling),
        buying: $1c5a2c3f8fdb36b2$var$toAsset(buying),
        amount: $1c5a2c3f8fdb36b2$var$toAmount(amount),
        price: $1c5a2c3f8fdb36b2$var$toPrice(price),
        offerId: offerID,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toManageBuyOffer(op, source) {
    const { selling: selling, buying: buying, buyAmount: buyAmount, price: price, offerID: offerID } = op;
    return (0, $kdgky$Operation).manageBuyOffer({
        selling: $1c5a2c3f8fdb36b2$var$toAsset(selling),
        buying: $1c5a2c3f8fdb36b2$var$toAsset(buying),
        buyAmount: $1c5a2c3f8fdb36b2$var$toAmount(buyAmount),
        price: $1c5a2c3f8fdb36b2$var$toPrice(price),
        offerId: offerID,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toCreatePassiveSellOffer(op, source) {
    const { selling: selling, buying: buying, amount: amount, price: price } = op;
    return (0, $kdgky$Operation).createPassiveSellOffer({
        selling: $1c5a2c3f8fdb36b2$var$toAsset(selling),
        buying: $1c5a2c3f8fdb36b2$var$toAsset(buying),
        amount: $1c5a2c3f8fdb36b2$var$toAmount(amount),
        price: $1c5a2c3f8fdb36b2$var$toPrice(price),
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toSetOptions(op = {}, source) {
    const { inflationDest: inflationDest, clearFlags: clearFlags, setFlags: setFlags, masterWeight: masterWeight, lowThreshold: lowThreshold, medThreshold: medThreshold, highThreshold: highThreshold, homeDomain: homeDomain, signer: signer } = op;
    let signerOptions;
    if (signer) switch(signer.key.charAt(0)){
        case "G":
            signerOptions = {
                ed25519PublicKey: signer.key,
                weight: signer.weight
            };
            break;
        case "X":
            signerOptions = {
                sha256Hash: (0, $kdgky$StrKey).decodeSha256Hash(signer.key),
                weight: signer.weight
            };
            break;
        case "T":
            signerOptions = {
                preAuthTx: (0, $kdgky$StrKey).decodePreAuthTx(signer.key),
                weight: signer.weight
            };
            break;
    }
    return (0, $kdgky$Operation).setOptions({
        inflationDest: inflationDest,
        clearFlags: clearFlags,
        setFlags: setFlags,
        masterWeight: masterWeight,
        lowThreshold: lowThreshold,
        medThreshold: medThreshold,
        highThreshold: highThreshold,
        homeDomain: homeDomain,
        signer: signerOptions,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toChangeTrust(op, source) {
    const { line: line, limit: limit } = op;
    return (0, $kdgky$Operation).changeTrust({
        asset: $1c5a2c3f8fdb36b2$var$toAsset(line),
        limit: limit && $1c5a2c3f8fdb36b2$var$toAmount(limit),
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toAllowTrust(op, source) {
    const { trustor: trustor, asset: asset, authorize: authorize } = op;
    return (0, $kdgky$Operation).allowTrust({
        trustor: trustor,
        authorize: $1c5a2c3f8fdb36b2$var$toBoolInt(authorize),
        assetCode: asset,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toAccountMerge(op, source) {
    const { destination: destination } = op;
    return (0, $kdgky$Operation).accountMerge({
        destination: destination,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toManageData(op, source) {
    const { dataName: dataName, dataValue: dataValue } = op;
    const value = $1c5a2c3f8fdb36b2$require$Buffer.from(dataValue, "hex");
    return (0, $kdgky$Operation).manageData({
        name: dataName,
        value: value,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toBumpSequence(op, source) {
    const { bumpTo: bumpTo } = op;
    return (0, $kdgky$Operation).bumpSequence({
        bumpTo: bumpTo,
        source: source
    });
}
function $1c5a2c3f8fdb36b2$var$toSignature(sig) {
    const hint = $1c5a2c3f8fdb36b2$require$Buffer.from(sig.hint, "hex");
    const signature = $1c5a2c3f8fdb36b2$require$Buffer.from(sig.signature, "hex");
    return new (0, $kdgky$xdr).DecoratedSignature({
        hint: hint,
        signature: signature
    });
}
function $1c5a2c3f8fdb36b2$var$toAsset(value) {
    if (!value) return undefined;
    if (value === "XLM") return (0, $kdgky$Asset).native();
    if (value === "native") return (0, $kdgky$Asset).native();
    const [code, issuer] = value.split(":");
    return new (0, $kdgky$Asset)(code, issuer);
}
function $1c5a2c3f8fdb36b2$var$toMemo(memo) {
    switch(memo.type){
        case "MEMO_TEXT":
            return (0, $kdgky$Memo).text(memo.text);
        case "MEMO_ID":
            return (0, $kdgky$Memo).id(memo.id);
        case "MEMO_HASH":
            return (0, $kdgky$Memo).hash(memo.hash);
        case "MEMO_RETURN":
            return (0, $kdgky$Memo).return(memo.retHash);
        default:
            return (0, $kdgky$Memo).none();
    }
}
function $1c5a2c3f8fdb36b2$var$toTimebounds(timeBounds) {
    if (!timeBounds) return undefined;
    const { minTime: minTime, maxTime: maxTime } = timeBounds;
    return {
        minTime: minTime,
        maxTime: maxTime
    };
}
function $1c5a2c3f8fdb36b2$var$toAmount(amount) {
    return new (0, $kdgky$bignumberjs)(amount).div(10000000).toFixed(7);
}
function $1c5a2c3f8fdb36b2$var$toPrice({ n: n, d: d }) {
    return {
        n: Number(n),
        d: Number(d)
    };
}
function $1c5a2c3f8fdb36b2$var$toBoolInt(v) {
    if (v === null || v === undefined) return 0;
    return Number(v);
}




const $59c3f91c43aef6b2$var$styles = {};
class $59c3f91c43aef6b2$var$ToTransactionPage extends $kdgky$Component {
    state = {
        xdr: "",
        txrep: "",
        error: ""
    };
    render() {
        const { classes: classes } = this.props;
        const { xdr: xdr, txrep: txrep, error: error } = this.state;
        return /*#__PURE__*/ (0, $kdgky$jsxs)("div", {
            children: [
                /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$Typography), {
                    variant: "h3",
                    component: "h1",
                    children: "Txrep to Transaction"
                }),
                /*#__PURE__*/ (0, $kdgky$jsxs)("form", {
                    className: classes.form,
                    noValidate: true,
                    autoComplete: "off",
                    name: "uri",
                    children: [
                        /*#__PURE__*/ (0, $kdgky$jsx)("div", {
                            children: /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$TextField), {
                                name: "txrep",
                                label: "Enter a SEP-11 Txrep",
                                error: !!error,
                                helperText: error,
                                fullWidth: true,
                                margin: "normal",
                                onChange: this.onTxrepChange,
                                multiline: true,
                                value: txrep || ""
                            })
                        }),
                        /*#__PURE__*/ (0, $kdgky$jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$TextField), {
                                    InputProps: {
                                        readOnly: true
                                    },
                                    label: "Transaction XDR",
                                    margin: "normal",
                                    multiline: true,
                                    fullWidth: true,
                                    value: xdr,
                                    variant: "filled"
                                }),
                                !error && xdr ? /*#__PURE__*/ (0, $kdgky$jsx)("div", {
                                    children: /*#__PURE__*/ (0, $kdgky$jsx)("a", {
                                        href: `https://www.stellar.org/laboratory/#xdr-viewer?input=${encodeURIComponent(xdr)}`,
                                        target: "_blank _noreferrer",
                                        children: "View in Stellar Laboratory"
                                    })
                                }) : null
                            ]
                        })
                    ]
                })
            ]
        });
    }
    onTxrepChange = (event)=>{
        const txrep = event.target.value || "";
        if (!txrep) {
            this.setState({
                txrep: txrep,
                error: "",
                xdr: ""
            });
            return;
        }
        try {
            const tx = (0, $1c5a2c3f8fdb36b2$export$9f69daeb64c04e5e)(txrep, (0, $kdgky$Networks).TESTNET);
            const xdr = tx.toEnvelope().toXDR("base64");
            this.setState({
                txrep: txrep,
                xdr: xdr,
                error: ""
            });
        } catch (e) {
            const error = "Error converting to transaction: " + e;
            this.setState({
                txrep: txrep,
                error: error
            });
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    };
}
var $59c3f91c43aef6b2$export$2e2bcd8739ae039 = (0, $kdgky$withStyles)($59c3f91c43aef6b2$var$styles)($59c3f91c43aef6b2$var$ToTransactionPage);







const $5589f91e524b0bd0$var$styles = {};
class $5589f91e524b0bd0$var$ToTxRepPage extends $kdgky$Component {
    state = {
        xdr: "",
        txrep: "",
        error: ""
    };
    render() {
        const { classes: classes } = this.props;
        const { xdr: xdr, txrep: txrep, error: error } = this.state;
        return /*#__PURE__*/ (0, $kdgky$jsxs)("div", {
            children: [
                /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$Typography), {
                    variant: "h3",
                    component: "h1",
                    children: "Transaction to Txrep"
                }),
                /*#__PURE__*/ (0, $kdgky$jsxs)("form", {
                    className: classes.form,
                    noValidate: true,
                    autoComplete: "off",
                    name: "uri",
                    children: [
                        /*#__PURE__*/ (0, $kdgky$jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$TextField), {
                                    name: "xdr",
                                    label: "Enter a base64 transaction XDR",
                                    error: !!error,
                                    helperText: error,
                                    fullWidth: true,
                                    margin: "normal",
                                    onChange: this.onXdrChange,
                                    multiline: true,
                                    value: xdr
                                }),
                                !error && xdr ? /*#__PURE__*/ (0, $kdgky$jsx)("div", {
                                    children: /*#__PURE__*/ (0, $kdgky$jsx)("a", {
                                        href: `https://www.stellar.org/laboratory/#xdr-viewer?input=${encodeURIComponent(xdr)}`,
                                        target: "_blank _noreferrer",
                                        children: "View in Stellar Laboratory"
                                    })
                                }) : null
                            ]
                        }),
                        /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$TextField), {
                            InputProps: {
                                readOnly: true
                            },
                            label: "Txrep",
                            margin: "normal",
                            multiline: true,
                            fullWidth: true,
                            value: txrep,
                            variant: "filled"
                        })
                    ]
                })
            ]
        });
    }
    onXdrChange = (event)=>{
        const xdr = event.target.value || "";
        if (!xdr) {
            this.setState({
                xdr: xdr,
                error: "",
                txrep: ""
            });
            return;
        }
        try {
            const tx = new (0, $kdgky$Transaction)(xdr, (0, $kdgky$Networks).TESTNET);
            try {
                const txrep = (0, $2aea750bec1a9578$export$77ccd3b555764565)(tx);
                this.setState({
                    xdr: xdr,
                    txrep: txrep,
                    error: ""
                });
            } catch (e) {
                const error = "Error converting to txrep: " + e;
                // tslint:disable-next-line:no-console
                console.error(e);
                this.setState({
                    xdr: xdr,
                    error: error
                });
            }
        } catch (e) {
            const error = "Invalid Transaction XDR: " + e;
            this.setState({
                xdr: xdr,
                error: error
            });
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    };
}
var $5589f91e524b0bd0$export$2e2bcd8739ae039 = (0, $kdgky$withStyles)($5589f91e524b0bd0$var$styles)($5589f91e524b0bd0$var$ToTxRepPage);


const $c78e4f99a6cb7a50$var$styles = ()=>({
        main: {
            padding: 24
        }
    });
class $c78e4f99a6cb7a50$var$Demo extends $kdgky$Component {
    state = {
        value: 0
    };
    render() {
        const { classes: classes } = this.props;
        const { value: value } = this.state;
        return /*#__PURE__*/ (0, $kdgky$jsxs)((0, $fa0170503e47de5f$export$2e2bcd8739ae039), {
            children: [
                /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$AppBar), {
                    position: "static",
                    children: /*#__PURE__*/ (0, $kdgky$jsxs)((0, $kdgky$Tabs), {
                        value: value,
                        onChange: this.handleChange,
                        children: [
                            /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$Tab), {
                                label: "To Txrep"
                            }),
                            /*#__PURE__*/ (0, $kdgky$jsx)((0, $kdgky$Tab), {
                                label: "To Transaction"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0, $kdgky$jsxs)("main", {
                    className: classes.main,
                    children: [
                        value === 0 && /*#__PURE__*/ (0, $kdgky$jsx)((0, $5589f91e524b0bd0$export$2e2bcd8739ae039), {}),
                        value === 1 && /*#__PURE__*/ (0, $kdgky$jsx)((0, $59c3f91c43aef6b2$export$2e2bcd8739ae039), {})
                    ]
                })
            ]
        });
    }
    handleChange = (event, value)=>{
        this.setState({
            value: value
        });
    };
}
var $c78e4f99a6cb7a50$export$2e2bcd8739ae039 = (0, $kdgky$withStyles)($c78e4f99a6cb7a50$var$styles)($c78e4f99a6cb7a50$var$Demo);


$kdgky$render(/*#__PURE__*/ (0, $kdgky$jsx)((0, $c78e4f99a6cb7a50$export$2e2bcd8739ae039), {}), document.getElementById("root"));


