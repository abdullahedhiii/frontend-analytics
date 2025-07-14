import mixpanel from "mixpanel-browser";
 
// Near entry of your product, init Mixpanel
mixpanel.init("0cc9de1a54f1f9ae1fe3c07b8abdf162", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});