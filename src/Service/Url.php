<?php
namespace Emeric0101\PHPAngular\Service;

class Url extends AService {

    public function redirect($module, $action = "", $id = null) {
        $url = $this->make($module, $action, $id);
        header('location: ' . $url);
        exit();
    }

    /**
    * make an url for page
    * @param module string Module target
    * @param action string Action on the module
    * @param id number Id
    * @param params object Other var to add
    **/
    public function make($module, $action = "", $id = null, $params = []) {
        $url = URL_ABSOLUTE . $module;
        if ($action !== "") {
            $url .= '/' . $action;
            if ($id !== null) {
                $url .= '/' . $id;
            }
        }

        $first = true;
        foreach ($params as $i => $param)
        {
            if ($first) {$url .= "?"; $first=false;}
            else {$url .= "&";}
            $url .= $i . "=" . $param;
        }
        return $url;
    }

    /**
    * Make a url for api request
    * @param module string
    * @param action string
    * @param id string = null
    * @param params array
    * @return string
    */
    function makeApi($module, $action, $id = null, $params = []) {
        $module = ucFirst($module);
        $url = URL_ABSOLUTE . $module;
        if ($action !== "") {
            $url .= '/' . $action;
            if ($id !== null) {
                $url .= '/' . $id;
            }
        }
        $url .= '.json';

        $first = true;
        foreach ($params as $i => $param) {
            if ($first) {$url .= "?"; $first=false;}
            else {$url .= "&";}
            $url .= $i . "=" . $param;
        }

        return $url;
    }
}
