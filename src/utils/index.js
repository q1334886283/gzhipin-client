export function getRedirectTo(usertype, header) {
    let path;
    //type
    if (usertype === "boss") {
        path = "/boss";
    } else {
        path = "/dashen";
    }
    //header
    if (!header) {
        path += "info";
    }
    return path;
}