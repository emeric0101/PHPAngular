<?php
namespace Emeric0101\PHPAngular\Service;
use \ForceUTF8\Encoding;
class Response extends Singleton {
    private $buffer = [
        'success' => false
    ];

    public function setError($errMsg = '') {
        $this->buffer['errMsg'] = $errMsg;
        $this->buffer['success'] = false;
    }

    public function getBuffer() {
        return $this->buffer;
    }


    public function setResponseArray(array $responseArray) {
        $this->buffer = array_merge($this->buffer, $responseArray);
    }

    public function setResponse(string $champ, $value) {
        $this->buffer[$champ] = $value;
    }

    public function render() {
    //    header('Content-Type: application/json; charset=utf-8');
        $utf8Array = \ForceUTF8\Encoding::toUTF8($this->buffer);
	    $returnAjax = json_encode($utf8Array, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT | JSON_PRETTY_PRINT );
        if ($returnAjax === false) {
            var_dump(json_last_error_msg());
        }
        echo $returnAjax;
        return $this->buffer;
    }

}
