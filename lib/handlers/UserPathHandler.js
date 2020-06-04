"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SubjectPathResolver = _interopRequireDefault(require("../resolvers/SubjectPathResolver"));

var _solidAuthFetcher = require("@inrupt/solid-auth-fetcher");

var _dataModel = require("@rdfjs/data-model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a path with the current user as a subject.
 */
class UserPathHandler extends _SubjectPathResolver.default {
  handle({
    settings
  }) {
    const subject = this.getWebId().then(_dataModel.namedNode);
    return this._createSubjectPath(subject, settings);
  }
  /** Gets the WebID of the logged in user */


  async getWebId() {
    const session = await (0, _solidAuthFetcher.getSession)();
    if (!session) throw new Error('Cannot resolve user path: no user logged in');
    return session.webId;
  }

}

exports.default = UserPathHandler;