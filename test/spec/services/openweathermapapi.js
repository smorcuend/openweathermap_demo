'use strict';

describe('Service: openWeatherMapApi', function () {

  // load the service's module
  beforeEach(module('weatherPredictorApp'));

  // instantiate service
  var openWeatherMapApi;
  beforeEach(inject(function (_openWeatherMapApi_) {
    openWeatherMapApi = _openWeatherMapApi_;
  }));

  it('should do something', function () {
    expect(!!openWeatherMapApi).toBe(true);
  });

});
