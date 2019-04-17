<table>
        <tr>
            <td><img width="120" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/rocket.svg" alt="onboarding" /></td>
            <td><strong>Archived Repository</strong><br />
            The code of this repository was written during a <a href="https://marmelab.com/blog/2018/09/05/agile-integration.html">Marmelab agile integration</a>. It illustrates the efforts of a new hiree, who had to implement a board game in several languages and platforms as part of his initial learning. Some of these efforts end up in failure, but failure is part of our learning process, so the code remains publicly visible.<br />
	    <strong>This code is not intended to be used in production, and is not maintained.</strong>
	    </td>
        </tr>
</table>

# SensioLabsInsight Mobile Client

Mobile Client for IOS (then Android and FirefoxOs) for [SensioLabsInsight](https://insight.sensiolabs.com), the PHP Project Quality service, created with [Ionic](http://ionicframework.com/) and [AngularJS](https://angularjs.org/).

![MobileInsight](http://static.marmelab.com/mobile_insight.png)

http://marmelab.com/blog/2014/09/26/mobile-insight-angular-ionic.html

## Installation

Copy the file `www/js/config/insight.js-dist` to `www/js/config/insight.js`, and set your insight id and token in it (you can find them in your [insight account page](https://insight.sensiolabs.com/account)).

You must have `node`, `gulp` and `ionic` on your system. Then:

    make install

## License

The code is released under the MIT License, courtsey of [marmelab](http://marmelab.com).
