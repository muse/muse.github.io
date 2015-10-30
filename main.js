/*
 * Author: mvdw
 * Mail: <mvdw at airmail dot cc>
 * Distributed under terms of the MIT license.
 */

(function(){
    var Hash = function(available, start) {
        /* The available hashes and their matching elements. */
        this.available = available;
        this.start = start;

        /* Listen and change the hash accordingly. */
        this.listen = function() {
            window.addEventListener('hashchange', function(){
                var section = [].slice.call(document.querySelectorAll('section'));
                for (var node = 0, len = section.length; node < len; node++)
                    section[node].classList.remove('visible');
                for (var hash in this.available)
                    if (window.location.hash === hash)
                        return this.enable(hash, this.available[hash]);
                return this.enable(Object.keys(this.available)[0], this.start[Object.keys(this.available)[0]]);
            }.bind(this));
        };

        this.enable = function(hash, attribute) {
            document.querySelector(attribute).classList.add('visible');
            document.querySelector('title').innerHTML =
                'Mirko van der Waal | ' + hash.replace('#', '');
            return window.location.hash = hash;
        };

        /* Initially load */
        this.enable(Object.keys(this.available)[0], this.start[Object.keys(this.available)[0]]);
    };

    var site = new Hash({
        /* The available paths and their elements. */
        '#about': 'section.about',
        '#work': 'section.work'
    },
        /* What should be shown by default. */
        {'#about': 'section.about'}
    );

    site.listen();
})();
