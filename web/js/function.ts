String.prototype['ucFirst'] = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
