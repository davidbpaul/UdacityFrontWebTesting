
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //check url

        it('url defined and not empty', function() {
         let i;
         for(i=0; i < allFeeds.length; i++){
           expect(allFeeds[i].url).toBeDefined();
           expect(allFeeds[i].url.length).not.toBe(0);
          }
        });

      // check name
         it('name defined and not empty', function() {
          let i;
          for(i=0; i < allFeeds.length; i++){
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
           }
         });

    });


    describe('The Menu', function() {

         //check if menu is initially hidden
      it('Menu element is hidden by default', function() {
          expect(document.body.className).toContain("menu-hidden");

      });
      // menu change on click
      it('menu change on click', function() {
          var menu = document.querySelector(".menu-icon-link");
          menu.click();
          expect(document.body.className).not.toContain("menu-hidden");
          menu.click();
          expect(document.body.className).toContain("menu-hidden");
      });
    });

    describe('Initial Entries', function() {
      // feed container does not contained null

        beforeEach(function(done){
          loadFeed(0, function() {
            done();
          });

        });

        //check for entry element
        it("1 entry after loadFeed function", function(done) {
          var numEntries = document.querySelector(".feed").firstElementChild;
          expect(numEntries).toBeDefined();
          done();
        });

        //check for http link
        it("has a http link'", function(done) {
          var entries = document.querySelector(".feed").getElementsByClassName("entry-link");
          for(var i = 0; i < entries.length; i++){
            expect(entries[i].href).toMatch("^https*:\/\/");
          }
        done();
        });

    });
    describe("New Feed Selection", function() {

      // load feed
      var initFeedSelection;
      beforeEach(function(done) {
        loadFeed(0, function() {
          initFeedSelection = document.querySelector(".feed").innerHTML;

          loadFeed(1, function() {
            done();
          });
        });
      });

      // checks content
      it("changes its loaded content", function(done) {
        var newFeedSelection = document.querySelector(".feed").innerHTML;
        expect(initFeedSelection).not.toBe(newFeedSelection);
        done();
      });
    });
}());
