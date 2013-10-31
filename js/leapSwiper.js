var controllerOptions = {enableGestures: true};
        Leap.loop(controllerOptions, function(frame){
                filterData(frame);
        });
        
        var gestureStart,
                gestureStop, circleInProgress = false;

function filterData(frame){
                if(frame.valid){
                        if( frame.gestures && frame.gestures.length > 0 ){
                                var gesture = frame.gestures[0];
                                if (gesture.type === "circle") {
                                    if(gesture.state == "start") {
                                        console.log("circleInProgress starts");
                                        circleInProgress = true;
                                    } else if(gesture.state === "stop" && gesture.pointableIds.length == 1) {
                                        fireKey(79)
                                        debounce(setCircleInProgress(false),500)
                                    }
                                } else if( gesture.type === "swipe" && !circleInProgress){
                                        if( gesture.state === "start" ){
                                                gestureStart = gesture.position[0];
                                        }else if( gesture.state === "update" ){
                                                gestureStop = gesture.position[0];
                                                if( gestureStop < gestureStart ){
                                                        doSwipe( 'left' );
                                                }else if( gestureStop > gestureStart ){
                                                        doSwipe( 'right' );
                                                }
                                        }        
                                }
                        }                        
                }
        };

        function doSwipe(dir){
                debounce(function(){
                        if( dir === 'left' ){
                                console.log("left swipe");
                                fireKey(37);
                                //SlideDeck.prevSlide();
                        }else if( dir === 'right' ){
                                console.log("right swipe");
                                fireKey(39);
                                //SlideDeck.nextSlide();
                        }else if( dir === 'up' ){
                            console.log("up swipe")
                        }else if( dir === 'down' ){
                            console.log("down swipe")
                        }
                }, 100);
        };
        
        var debounceTimer;
        function debounce(callback,delay){
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(function(){
                        callback();
                }, delay);
        };

        function setCircleInProgress(state) {
            console.log("1circleInProgress=" + circleInProgress)
            circleInProgress = state;
            console.log("2circleInProgress=" + circleInProgress)
        }

        function fireKey(keyCode){
    //Set key to corresponding code. This one is set to the left arrow key.
    //var key = 37;
    el = document.body;
    if(document.createEventObject)
    {
        var eventObj = document.createEventObject();
        eventObj.keyCode = keyCode;
        el.fireEvent("onkeydown", eventObj);
        el.fireEvent("onkeyup", eventObj);   
    }else if(document.createEvent)
    {
        var eventObj = document.createEvent("Event");
        eventObj.initEvent("keydown", true, true);
        eventObj.keyCode = keyCode;
        el.dispatchEvent(eventObj);

        eventObj = document.createEvent("Event");
        eventObj.initEvent("keyup", true, true);
        eventObj.keyCode = keyCode;
        el.dispatchEvent(eventObj);
    }
} 
