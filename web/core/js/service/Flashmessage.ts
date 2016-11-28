module Emeric0101.PHPAngular.Service {
    class FlashmessageService {
        static $inject = [];
        private buffer : {msg : string, type: string}[] = [];
        getBuffer() {
            return this.buffer;
        }
        /**
        * Remove a Flashmessage
        */
        remove(flash : {msg : string, type: string}) {
            var newBuffer = [];
            for (var i in this.buffer) {
                if (this.buffer[i] === flash) { continue;}
                newBuffer.push(this.buffer[i]);
            }
            this.buffer =newBuffer;
        }
        create(msg : string, type : string) {
            this.buffer.push({
                msg: msg,
                type: type
            });
        }
        constructor() {
        }
    }
    phpangularModule.service("FlashmessageService", FlashmessageService);
}
