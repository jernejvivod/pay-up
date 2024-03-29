(function() {
  var loansData = function($http, authentication) {
    // loans: get specified page of user's loans.
    var loans = function(idUser, pageIndex, filterIndex) {
      return $http.get('/api/users/' + idUser + '/loans/' + pageIndex, {
        headers: {
          filtidx: filterIndex,
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function success(response) {
          return response;
      });
    };
    
    // Make HEAD request to server to get number of user's loans.
    var numLoans = function(idUser) {
      return $http.head('/api/users/' + idUser + '/loans', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function success(response) {
        return response;
      }, function error(response) {
        return response;
      });
    };
    
    // Make HEAD request to server to get number of user's loans.
    // add status header to filter by status on API
    var numLoansByStatus = function(idUser, status) {
    return $http.head('/api/users/' + idUser + '/loans', {
        headers: {
          statusfilt : status,
          Authorization: 'Bearer ' + authentication.getToken()
        }
      }).then(function success(response) {
        return response;
      }, function error(response) {
        return response;
      });
    };
    
    
    // Return implemented functions.
    return {
      loans: loans,
      numLoans: numLoans,
      numLoansByStatus: numLoansByStatus
    };
  };
  
  loansData.$inject = ['$http', 'authentication'];
  
  /* global angular */
  angular
    .module('payupApp')
    .service('loansData', loansData);
})();