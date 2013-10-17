// Create a namespace for the program, if not already created
var szko = szko ? szko : {};

szko.eventRecorder = (function () {
    "use strict";

    // Private vars
    var recordLog = [],
        recording = false,
        startTime = new Date().getTime(),
        allEventTypes = [ // List from http://stackoverflow.com/questions/5107232/is-it-possible-to-programmatically-catch-all-events-on-the-page-in-the-browser
            "abort", "afterprint", "beforeprint", "beforeunload", "blur",
            "canplay", "canplaythrough", "change", "click", "contextmenu",
            "copy", "cuechange", "cut", "dblclick", "DOMContentLoaded",
            "drag", "dragend", "dragenter", "dragleave", "dragover",
            "dragstart", "drop", "durationchange", "emptied", "ended",
            "error", "focus", "focusin", "focusout", "formchange",
            "forminput", "hashchange", "input", "invalid", "keydown",
            "keypress", "keyup", "load", "loadeddata", "loadedmetadata",
            "loadstart", "message", "mousedown", "mouseenter", "mouseleave",
            "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel",
            "offline", "online", "pagehide", "pageshow", "paste",
            "pause", "play", "playing", "popstate", "progress",
            "ratechange", "readystatechange", "redo", "reset", "resize",
            "scroll", "seeked", "seeking", "select", "show",
            "stalled", "storage", "submit", "suspend", "timeupdate",
            "undo", "unload", "volumechange", "waiting"
        ],


    play = function() {
        console.log("Play back function called.");
    },


    getLog = function() {
        return recordLog;
    },


    recordAction = function(e) {
        if(recording) {
            recordLog[recordLog.length] = {
                'timeDelay' : (new Date().getTime()) - startTime,
                'event' : e
            };
            console.log("An action happened.", e);
        }
    },


    stopRecording = function() {
        // Remove event listeners
        var everything = document.querySelectorAll("body, body *");
        for(var i = 0; i < everything.length; i++) {
            for(var j = 0; j < allEventTypes.length; j++) {
                everything[i].removeEventListener(allEventTypes[j], recordAction, false);
            }
        }

        recording = false;
        console.log("Stopped recording.");
    },


    startRecording = function() {
        // Add event listeners
        var everything = document.querySelectorAll("body, body *");
        for(var i = 0; i < everything.length; i++) {
            for(var j = 0; j < allEventTypes.length; j++) {
                everything[i].addEventListener(allEventTypes[j], recordAction, false);
            }
        }

        recording = true;
        console.log("Started recording.");
    };


    // Return exposes some private functions as public
    return {
        getLog : getLog.bind(szko.eventRecorder),
        startRecording : startRecording.bind(szko.eventRecorder),
        stopRecording : stopRecording.bind(szko.eventRecorder)
    };

}());