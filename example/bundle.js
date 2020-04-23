/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "58b56ceb7766836fcdb1";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "example";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./example/app.js":
/*!************************!*\
  !*** ./example/app.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/index */ \"./src/index.tsx\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ \"./example/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\nfunction App() {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])('https://media.w3.org/2010/05/sintel/trailer_hd.mp4'),\n      _useState2 = _slicedToArray(_useState, 1),\n      url = _useState2[0];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(['play', 'time', 'progress', 'volume', 'full-screen']),\n      _useState4 = _slicedToArray(_useState3, 2),\n      controls = _useState4[0],\n      setControls = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState6 = _slicedToArray(_useState5, 2),\n      isPlaying = _useState6[0],\n      setIsPlaying = _useState6[1];\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0.7),\n      _useState8 = _slicedToArray(_useState7, 2),\n      volume = _useState8[0],\n      setVolume = _useState8[1];\n\n  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(5),\n      _useState10 = _slicedToArray(_useState9, 1),\n      timeStart = _useState10[0];\n\n  var controlsList = [{\n    id: 'play',\n    title: 'Play button'\n  }, {\n    id: 'time',\n    title: 'Time'\n  }, {\n    id: 'progress',\n    title: 'Progress'\n  }, {\n    id: 'volume',\n    title: 'Volume'\n  }, {\n    id: 'full-screen',\n    title: 'Full Screen'\n  }];\n\n  var handlePlay = function handlePlay() {\n    setIsPlaying(true);\n  };\n\n  var handlePause = function handlePause() {\n    setIsPlaying(false);\n  };\n\n  var handleControlToggle = function handleControlToggle(event) {\n    var result = _toConsumableArray(controls);\n\n    var name = event.target.id;\n\n    if (result.includes(name)) {\n      result = result.filter(function (item) {\n        return item !== name;\n      });\n    } else {\n      result.push(name);\n    }\n\n    setControls(result);\n  };\n\n  var handleVolume = function handleVolume(value) {\n    setVolume(value);\n  };\n\n  var handleProgress = function handleProgress(e) {\n    console.log('Current time: ', e.target.currentTime);\n  };\n\n  var handleDuration = function handleDuration(duration) {\n    console.log('Duration: ', duration);\n  };\n\n  var handleMarkerClick = function handleMarkerClick(marker) {\n    alert(\"Marker \".concat(marker.id, \" clicked!\"));\n  };\n\n  var markers = [{\n    id: 1,\n    time: 5,\n    color: '#ffc837',\n    title: 'Marker 1'\n  }, {\n    id: 2,\n    time: 10,\n    color: '#ffc837',\n    title: 'Marker 2'\n  }];\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"container\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    url: url,\n    controls: controls,\n    isPlaying: isPlaying,\n    volume: volume,\n    loop: true,\n    markers: markers,\n    height: '360px',\n    width: '640px',\n    timeStart: timeStart,\n    onPlay: handlePlay,\n    onPause: handlePause,\n    onVolume: handleVolume,\n    onProgress: handleProgress,\n    onDuration: handleDuration,\n    onMarkerClick: handleMarkerClick\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"controls\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Controls:\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: isPlaying ? handlePause : handlePlay\n  }, isPlaying ? 'Pause' : 'Play')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Show controls:\", controlsList.map(function (control) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n      key: control.id,\n      htmlFor: control.id\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n      id: control.id,\n      type: \"checkbox\",\n      checked: controls.includes(control.id),\n      onChange: handleControlToggle\n    }), ' ', control.title);\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"State:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"url: \", url), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"controls: \", controls.length ? '[\"' : '', controls.join('\", \"'), controls.length ? '\"]' : ''), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"isPlaying: \", isPlaying.toString()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"volume: \", volume), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"timeStart: \", timeStart)));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/home/arthur/www/react-video-markers/example/app.js\"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, \"/home/arthur/www/react-video-markers/example/app.js\"); } }(); \n\n//# sourceURL=webpack:///./example/app.js?");

/***/ }),

/***/ "./example/index.tsx":
/*!***************************!*\
  !*** ./example/index.tsx ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./example/app.js\");\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.querySelector('#content'));\n void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/home/arthur/www/react-video-markers/example/index.tsx\"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, \"/home/arthur/www/react-video-markers/example/index.tsx\"); } }(); \n\n//# sourceURL=webpack:///./example/index.tsx?");

/***/ }),

/***/ "./example/styles.css":
/*!****************************!*\
  !*** ./example/styles.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./example/styles.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./example/styles.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./example/styles.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./example/styles.css?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./example/styles.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./example/styles.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \".container {\\n  margin: 0 auto;\\n  width: 640px;\\n}\\n\\n.controls {\\n  margin-top: 20px;\\n}\\n\\nbutton {\\n  background-color: #eee;\\n  border: 0;\\n  border-radius: 3px;\\n  cursor: pointer;\\n  margin: 0 10px;\\n  outline: 0;\\n  padding: 6px 12px;\\n}\\n\\nlabel {\\n  cursor: pointer;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./example/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Imports\nvar getUrl = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! ./images/play-black.svg */ \"./src/images/play-black.svg\"));\nvar ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! ./images/pause-black.svg */ \"./src/images/pause-black.svg\"));\nvar ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! ./images/volume-black.svg */ \"./src/images/volume-black.svg\"));\nvar ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! ./images/no-volume-black.svg */ \"./src/images/no-volume-black.svg\"));\nvar ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! ./images/full-screen-black.svg */ \"./src/images/full-screen-black.svg\"));\nvar ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! ./images/close-video.svg */ \"./src/images/close-video.svg\"));\nvar ___CSS_LOADER_URL___6___ = getUrl(__webpack_require__(/*! ./images/play-white.svg */ \"./src/images/play-white.svg\"));\nvar ___CSS_LOADER_URL___7___ = getUrl(__webpack_require__(/*! ./images/pause-white.svg */ \"./src/images/pause-white.svg\"));\nvar ___CSS_LOADER_URL___8___ = getUrl(__webpack_require__(/*! ./images/volume-white.svg */ \"./src/images/volume-white.svg\"));\nvar ___CSS_LOADER_URL___9___ = getUrl(__webpack_require__(/*! ./images/no-volume-white.svg */ \"./src/images/no-volume-white.svg\"));\nvar ___CSS_LOADER_URL___10___ = getUrl(__webpack_require__(/*! ./images/full-screen-white.svg */ \"./src/images/full-screen-white.svg\"));\n// Module\nexports.push([module.i, \".react-video-wrap {\\n  padding-bottom: 36px;\\n  position: relative;\\n}\\n\\n.react-video-wrap video {\\n  background-color: #000000;\\n  display: block;\\n  height: 100%;\\n  width: 100%;\\n}\\n\\n.react-video-controls {\\n  background-color: #e7e7e7;\\n  display: flex;\\n  height: 36px;\\n  padding: 0 7px;\\n  position: absolute;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n}\\n\\n.react-video-controls button {\\n  background-color: transparent;\\n  background-repeat: no-repeat;\\n  background-position: center center;\\n  border: 0;\\n  cursor: pointer;\\n  margin: 10px 7px;\\n  padding: 0;\\n  outline: none;\\n  height: 16px;\\n  width: 16px;\\n  text-indent: -9999px;\\n}\\n\\n.react-video-controls .play {\\n  background-image: url(\" + ___CSS_LOADER_URL___0___ + \");\\n}\\n\\n.react-video-controls .pause {\\n  background-image: url(\" + ___CSS_LOADER_URL___1___ + \");\\n  background-size: 15px;\\n}\\n\\n.react-video-controls .volume {\\n  background-image: url(\" + ___CSS_LOADER_URL___2___ + \");\\n  background-position-x: 0;\\n  width: 17px;\\n}\\n\\n.react-video-controls .no-volume {\\n  background-image: url(\" + ___CSS_LOADER_URL___3___ + \");\\n  background-position-x: 0;\\n  width: 17px;\\n}\\n\\n.react-video-controls .full-screen {\\n  background-image: url(\" + ___CSS_LOADER_URL___4___ + \");\\n  width: 17px;\\n}\\n\\n.react-video-controls .time {\\n  color: #969696;\\n  font-size: 10px;\\n  line-height: 37px;\\n  margin: 0 7px;\\n}\\n\\n.react-video-controls progress {\\n  appearance: none;\\n  -webkit-appearance: none;\\n  cursor: pointer;\\n}\\n\\n.react-video-controls .progress-wrap {\\n  flex-grow: 1;\\n  margin: 5px 7px 0;\\n  position: relative;\\n}\\n\\n.react-video-controls .progress-wrap progress {\\n  height: 8px;\\n  width: 100%;\\n}\\n\\n.react-video-controls .progress-wrap progress::-webkit-progress-value {\\n  background: #28C0F0;\\n}\\n\\n.react-video-controls .progress-wrap progress::-webkit-progress-bar {\\n  background: #ffffff;\\n}\\n\\n.react-video-controls .progress-wrap .react-video-marker {\\n  background-color: #666666;\\n  cursor: pointer;\\n  display: block;\\n  height: 8px;\\n  width: 4px;\\n  position: absolute;\\n  top: 9px;\\n  left: 50%;\\n}\\n\\n.react-video-controls .volume-wrap {\\n  position: relative;\\n}\\n\\n.react-video-controls .volume-wrap:hover progress {\\n  display: block;\\n}\\n\\n.react-video-controls .volume-wrap progress {\\n  border-radius: 2px;\\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\\n  display: none;\\n  height: 12px;\\n  overflow: hidden;\\n  position: absolute;\\n  top: -52px;\\n  left: -31px;\\n  transform: rotate(-90deg);\\n  width: 100px;\\n}\\n\\n.react-video-controls .volume-wrap progress::-webkit-progress-value {\\n  background: #ffffff;\\n}\\n\\n.react-video-controls .volume-wrap progress::-webkit-progress-bar {\\n  background: #9d9d9d;\\n}\\n\\n.react-video-full-screen .react-video-wrap {\\n  background-color: #000000;\\n  height: 100%;\\n  width: 100%;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  z-index: 10;\\n}\\n\\n.react-video-full-screen .react-video-player {\\n  height: calc(100vh - 36px);\\n  max-width: 100%;\\n}\\n\\n.react-video-full-screen .react-video-close {\\n  background: url(\" + ___CSS_LOADER_URL___5___ + \") no-repeat transparent;\\n  border: 0;\\n  cursor: pointer;\\n  opacity: 1;\\n  outline: none;\\n  text-indent: -9999px;\\n  height: 23px;\\n  width: 23px;\\n  position: absolute;\\n  top: 36px;\\n  right: 77px;\\n}\\n\\n.react-video-full-screen .react-video-controls {\\n  background-color: #595959;\\n}\\n\\n.react-video-full-screen .react-video-controls .play {\\n  background-image: url(\" + ___CSS_LOADER_URL___6___ + \");\\n}\\n\\n.react-video-full-screen .react-video-controls .pause {\\n  background-image: url(\" + ___CSS_LOADER_URL___7___ + \");\\n}\\n\\n.react-video-full-screen .react-video-controls .volume {\\n  background-image: url(\" + ___CSS_LOADER_URL___8___ + \");\\n}\\n\\n.react-video-full-screen .react-video-controls .no-volume {\\n  background-image: url(\" + ___CSS_LOADER_URL___9___ + \");\\n}\\n\\n.react-video-full-screen .react-video-controls .full-screen {\\n  background-image: url(\" + ___CSS_LOADER_URL___10___ + \");\\n}\\n\\n.react-video-full-screen .react-video-controls .time {\\n  color: #ffffff;\\n}\\n\", \"\"]);\n\n\n//# sourceURL=webpack:///./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \"{\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      // eslint-disable-next-line prefer-destructuring\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = modules[_i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\".concat(item[2], \") and (\").concat(mediaQuery, \")\");\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot).concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (url, needQuotes) {\n  // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n  url = url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar printWarning = function() {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n  var loggedTypeFailures = {};\n  var has = Function.call.bind(Object.prototype.hasOwnProperty);\n\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error(\n              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +\n              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'\n            );\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        if (error && !(error instanceof Error)) {\n          printWarning(\n            (componentName || 'React class') + ': type specification of ' +\n            location + ' `' + typeSpecName + '` is invalid; the type checker ' +\n            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +\n            'You may have forgotten to pass an argument to the type checker ' +\n            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +\n            'shape all require an argument).'\n          );\n        }\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          printWarning(\n            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')\n          );\n        }\n      }\n    }\n  }\n}\n\n/**\n * Resets warning cache when testing.\n *\n * @private\n */\ncheckPropTypes.resetWarningCache = function() {\n  if (true) {\n    loggedTypeFailures = {};\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.development.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction checkDCE() {\n  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */\n  if (\n    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||\n    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'\n  ) {\n    return;\n  }\n  if (true) {\n    // This branch is unreachable because this function is only called\n    // in production, but the condition is true only in development.\n    // Therefore if the branch is still here, dead code elimination wasn't\n    // properly applied.\n    // Don't change the message. React DevTools relies on it. Also make sure\n    // this message doesn't occur elsewhere in this function, or it will cause\n    // a false positive.\n    throw new Error('^_^');\n  }\n  try {\n    // Verify that the code above has been dead code eliminated (DCE'd).\n    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);\n  } catch (err) {\n    // DevTools shouldn't crash React, no matter what.\n    // We should still report in case we break this code.\n    console.error(err);\n  }\n}\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react-dom.development.js */ \"./node_modules/react-dom/cjs/react-dom.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/react-dom/index.js?");

/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v16.10.2\n * react.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nvar _assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\nvar checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ \"./node_modules/prop-types/checkPropTypes.js\");\n\n// TODO: this is special because it gets imported during build.\n\nvar ReactVersion = '16.10.2';\n\n// The Symbol used to tag the ReactElement-like types. If there is no native Symbol\n// nor polyfill, then a plain number is used for performance.\nvar hasSymbol = typeof Symbol === 'function' && Symbol.for;\nvar REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;\nvar REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;\nvar REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;\nvar REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;\nvar REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;\nvar REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;\nvar REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary\n// (unstable) APIs that have been removed. Can we remove the symbols?\n\n\nvar REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;\nvar REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;\nvar REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;\nvar REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;\nvar REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;\nvar REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;\nvar REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;\nvar REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;\nvar REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;\nvar MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\nvar FAUX_ITERATOR_SYMBOL = '@@iterator';\nfunction getIteratorFn(maybeIterable) {\n  if (maybeIterable === null || typeof maybeIterable !== 'object') {\n    return null;\n  }\n\n  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];\n\n  if (typeof maybeIterator === 'function') {\n    return maybeIterator;\n  }\n\n  return null;\n}\n\n// Do not require this module directly! Use normal `invariant` calls with\n// template literal strings. The messages will be converted to ReactError during\n// build, and in production they will be minified.\n\n// Do not require this module directly! Use normal `invariant` calls with\n// template literal strings. The messages will be converted to ReactError during\n// build, and in production they will be minified.\nfunction ReactError(error) {\n  error.name = 'Invariant Violation';\n  return error;\n}\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\n/**\n * Forked from fbjs/warning:\n * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js\n *\n * Only change is we use console.warn instead of console.error,\n * and do nothing when 'console' is not supported.\n * This really simplifies the code.\n * ---\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\nvar lowPriorityWarningWithoutStack = function () {};\n\n{\n  var printWarning = function (format) {\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    var argIndex = 0;\n    var message = 'Warning: ' + format.replace(/%s/g, function () {\n      return args[argIndex++];\n    });\n\n    if (typeof console !== 'undefined') {\n      console.warn(message);\n    }\n\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n\n  lowPriorityWarningWithoutStack = function (condition, format) {\n    if (format === undefined) {\n      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n\n    if (!condition) {\n      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n        args[_key2 - 2] = arguments[_key2];\n      }\n\n      printWarning.apply(void 0, [format].concat(args));\n    }\n  };\n}\n\nvar lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\nvar warningWithoutStack = function () {};\n\n{\n  warningWithoutStack = function (condition, format) {\n    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      args[_key - 2] = arguments[_key];\n    }\n\n    if (format === undefined) {\n      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n\n    if (args.length > 8) {\n      // Check before the condition to catch violations early.\n      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');\n    }\n\n    if (condition) {\n      return;\n    }\n\n    if (typeof console !== 'undefined') {\n      var argsWithFormat = args.map(function (item) {\n        return '' + item;\n      });\n      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it\n      // breaks IE9: https://github.com/facebook/react/issues/13610\n\n      Function.prototype.apply.call(console.error, console, argsWithFormat);\n    }\n\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      var argIndex = 0;\n      var message = 'Warning: ' + format.replace(/%s/g, function () {\n        return args[argIndex++];\n      });\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\nvar warningWithoutStack$1 = warningWithoutStack;\n\nvar didWarnStateUpdateForUnmountedComponent = {};\n\nfunction warnNoop(publicInstance, callerName) {\n  {\n    var _constructor = publicInstance.constructor;\n    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';\n    var warningKey = componentName + \".\" + callerName;\n\n    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {\n      return;\n    }\n\n    warningWithoutStack$1(false, \"Can't call %s on a component that is not yet mounted. \" + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);\n    didWarnStateUpdateForUnmountedComponent[warningKey] = true;\n  }\n}\n/**\n * This is the abstract API for an update queue.\n */\n\n\nvar ReactNoopUpdateQueue = {\n  /**\n   * Checks whether or not this composite component is mounted.\n   * @param {ReactClass} publicInstance The instance we want to test.\n   * @return {boolean} True if mounted, false otherwise.\n   * @protected\n   * @final\n   */\n  isMounted: function (publicInstance) {\n    return false;\n  },\n\n  /**\n   * Forces an update. This should only be invoked when it is known with\n   * certainty that we are **not** in a DOM transaction.\n   *\n   * You may want to call this when you know that some deeper aspect of the\n   * component's state has changed but `setState` was not called.\n   *\n   * This will not invoke `shouldComponentUpdate`, but it will invoke\n   * `componentWillUpdate` and `componentDidUpdate`.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} callerName name of the calling function in the public API.\n   * @internal\n   */\n  enqueueForceUpdate: function (publicInstance, callback, callerName) {\n    warnNoop(publicInstance, 'forceUpdate');\n  },\n\n  /**\n   * Replaces all of the state. Always use this or `setState` to mutate state.\n   * You should treat `this.state` as immutable.\n   *\n   * There is no guarantee that `this.state` will be immediately updated, so\n   * accessing `this.state` after calling this method may return the old value.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {object} completeState Next state.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} callerName name of the calling function in the public API.\n   * @internal\n   */\n  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {\n    warnNoop(publicInstance, 'replaceState');\n  },\n\n  /**\n   * Sets a subset of the state. This only exists because _pendingState is\n   * internal. This provides a merging strategy that is not available to deep\n   * properties which is confusing. TODO: Expose pendingState or don't use it\n   * during the merge.\n   *\n   * @param {ReactClass} publicInstance The instance that should rerender.\n   * @param {object} partialState Next partial state to be merged with state.\n   * @param {?function} callback Called after component is updated.\n   * @param {?string} Name of the calling function in the public API.\n   * @internal\n   */\n  enqueueSetState: function (publicInstance, partialState, callback, callerName) {\n    warnNoop(publicInstance, 'setState');\n  }\n};\n\nvar emptyObject = {};\n\n{\n  Object.freeze(emptyObject);\n}\n/**\n * Base class helpers for the updating state of a component.\n */\n\n\nfunction Component(props, context, updater) {\n  this.props = props;\n  this.context = context; // If a component has string refs, we will assign a different object later.\n\n  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the\n  // renderer.\n\n  this.updater = updater || ReactNoopUpdateQueue;\n}\n\nComponent.prototype.isReactComponent = {};\n/**\n * Sets a subset of the state. Always use this to mutate\n * state. You should treat `this.state` as immutable.\n *\n * There is no guarantee that `this.state` will be immediately updated, so\n * accessing `this.state` after calling this method may return the old value.\n *\n * There is no guarantee that calls to `setState` will run synchronously,\n * as they may eventually be batched together.  You can provide an optional\n * callback that will be executed when the call to setState is actually\n * completed.\n *\n * When a function is provided to setState, it will be called at some point in\n * the future (not synchronously). It will be called with the up to date\n * component arguments (state, props, context). These values can be different\n * from this.* because your function may be called after receiveProps but before\n * shouldComponentUpdate, and this new state, props, and context will not yet be\n * assigned to this.\n *\n * @param {object|function} partialState Next partial state or function to\n *        produce next partial state to be merged with current state.\n * @param {?function} callback Called after state is updated.\n * @final\n * @protected\n */\n\nComponent.prototype.setState = function (partialState, callback) {\n  (function () {\n    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {\n      {\n        throw ReactError(Error(\"setState(...): takes an object of state variables to update or a function which returns an object of state variables.\"));\n      }\n    }\n  })();\n\n  this.updater.enqueueSetState(this, partialState, callback, 'setState');\n};\n/**\n * Forces an update. This should only be invoked when it is known with\n * certainty that we are **not** in a DOM transaction.\n *\n * You may want to call this when you know that some deeper aspect of the\n * component's state has changed but `setState` was not called.\n *\n * This will not invoke `shouldComponentUpdate`, but it will invoke\n * `componentWillUpdate` and `componentDidUpdate`.\n *\n * @param {?function} callback Called after update is complete.\n * @final\n * @protected\n */\n\n\nComponent.prototype.forceUpdate = function (callback) {\n  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');\n};\n/**\n * Deprecated APIs. These APIs used to exist on classic React classes but since\n * we would like to deprecate them, we're not going to move them over to this\n * modern base class. Instead, we define a getter that warns if it's accessed.\n */\n\n\n{\n  var deprecatedAPIs = {\n    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],\n    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']\n  };\n\n  var defineDeprecationWarning = function (methodName, info) {\n    Object.defineProperty(Component.prototype, methodName, {\n      get: function () {\n        lowPriorityWarningWithoutStack$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);\n        return undefined;\n      }\n    });\n  };\n\n  for (var fnName in deprecatedAPIs) {\n    if (deprecatedAPIs.hasOwnProperty(fnName)) {\n      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);\n    }\n  }\n}\n\nfunction ComponentDummy() {}\n\nComponentDummy.prototype = Component.prototype;\n/**\n * Convenience component with default shallow equality check for sCU.\n */\n\nfunction PureComponent(props, context, updater) {\n  this.props = props;\n  this.context = context; // If a component has string refs, we will assign a different object later.\n\n  this.refs = emptyObject;\n  this.updater = updater || ReactNoopUpdateQueue;\n}\n\nvar pureComponentPrototype = PureComponent.prototype = new ComponentDummy();\npureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.\n\n_assign(pureComponentPrototype, Component.prototype);\n\npureComponentPrototype.isPureReactComponent = true;\n\n// an immutable object with a single mutable value\nfunction createRef() {\n  var refObject = {\n    current: null\n  };\n\n  {\n    Object.seal(refObject);\n  }\n\n  return refObject;\n}\n\n/**\n * Keeps track of the current dispatcher.\n */\nvar ReactCurrentDispatcher = {\n  /**\n   * @internal\n   * @type {ReactComponent}\n   */\n  current: null\n};\n\n/**\n * Keeps track of the current batch's configuration such as how long an update\n * should suspend for if it needs to.\n */\nvar ReactCurrentBatchConfig = {\n  suspense: null\n};\n\n/**\n * Keeps track of the current owner.\n *\n * The current owner is the component who should own any components that are\n * currently being constructed.\n */\nvar ReactCurrentOwner = {\n  /**\n   * @internal\n   * @type {ReactComponent}\n   */\n  current: null\n};\n\nvar BEFORE_SLASH_RE = /^(.*)[\\\\\\/]/;\nvar describeComponentFrame = function (name, source, ownerName) {\n  var sourceInfo = '';\n\n  if (source) {\n    var path = source.fileName;\n    var fileName = path.replace(BEFORE_SLASH_RE, '');\n\n    {\n      // In DEV, include code for a common special case:\n      // prefer \"folder/index.js\" instead of just \"index.js\".\n      if (/^index\\./.test(fileName)) {\n        var match = path.match(BEFORE_SLASH_RE);\n\n        if (match) {\n          var pathBeforeSlash = match[1];\n\n          if (pathBeforeSlash) {\n            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');\n            fileName = folderName + '/' + fileName;\n          }\n        }\n      }\n    }\n\n    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';\n  } else if (ownerName) {\n    sourceInfo = ' (created by ' + ownerName + ')';\n  }\n\n  return '\\n    in ' + (name || 'Unknown') + sourceInfo;\n};\n\nvar Resolved = 1;\n\nfunction refineResolvedLazyComponent(lazyComponent) {\n  return lazyComponent._status === Resolved ? lazyComponent._result : null;\n}\n\nfunction getWrappedName(outerType, innerType, wrapperName) {\n  var functionName = innerType.displayName || innerType.name || '';\n  return outerType.displayName || (functionName !== '' ? wrapperName + \"(\" + functionName + \")\" : wrapperName);\n}\n\nfunction getComponentName(type) {\n  if (type == null) {\n    // Host root, text node or just invalid type.\n    return null;\n  }\n\n  {\n    if (typeof type.tag === 'number') {\n      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');\n    }\n  }\n\n  if (typeof type === 'function') {\n    return type.displayName || type.name || null;\n  }\n\n  if (typeof type === 'string') {\n    return type;\n  }\n\n  switch (type) {\n    case REACT_FRAGMENT_TYPE:\n      return 'Fragment';\n\n    case REACT_PORTAL_TYPE:\n      return 'Portal';\n\n    case REACT_PROFILER_TYPE:\n      return \"Profiler\";\n\n    case REACT_STRICT_MODE_TYPE:\n      return 'StrictMode';\n\n    case REACT_SUSPENSE_TYPE:\n      return 'Suspense';\n\n    case REACT_SUSPENSE_LIST_TYPE:\n      return 'SuspenseList';\n  }\n\n  if (typeof type === 'object') {\n    switch (type.$$typeof) {\n      case REACT_CONTEXT_TYPE:\n        return 'Context.Consumer';\n\n      case REACT_PROVIDER_TYPE:\n        return 'Context.Provider';\n\n      case REACT_FORWARD_REF_TYPE:\n        return getWrappedName(type, type.render, 'ForwardRef');\n\n      case REACT_MEMO_TYPE:\n        return getComponentName(type.type);\n\n      case REACT_LAZY_TYPE:\n        {\n          var thenable = type;\n          var resolvedThenable = refineResolvedLazyComponent(thenable);\n\n          if (resolvedThenable) {\n            return getComponentName(resolvedThenable);\n          }\n\n          break;\n        }\n    }\n  }\n\n  return null;\n}\n\nvar ReactDebugCurrentFrame = {};\nvar currentlyValidatingElement = null;\nfunction setCurrentlyValidatingElement(element) {\n  {\n    currentlyValidatingElement = element;\n  }\n}\n\n{\n  // Stack implementation injected by the current renderer.\n  ReactDebugCurrentFrame.getCurrentStack = null;\n\n  ReactDebugCurrentFrame.getStackAddendum = function () {\n    var stack = ''; // Add an extra top frame while an element is being validated\n\n    if (currentlyValidatingElement) {\n      var name = getComponentName(currentlyValidatingElement.type);\n      var owner = currentlyValidatingElement._owner;\n      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));\n    } // Delegate to the injected renderer-specific implementation\n\n\n    var impl = ReactDebugCurrentFrame.getCurrentStack;\n\n    if (impl) {\n      stack += impl() || '';\n    }\n\n    return stack;\n  };\n}\n\n/**\n * Used by act() to track whether you're inside an act() scope.\n */\nvar IsSomeRendererActing = {\n  current: false\n};\n\nvar ReactSharedInternals = {\n  ReactCurrentDispatcher: ReactCurrentDispatcher,\n  ReactCurrentBatchConfig: ReactCurrentBatchConfig,\n  ReactCurrentOwner: ReactCurrentOwner,\n  IsSomeRendererActing: IsSomeRendererActing,\n  // Used by renderers to avoid bundling object-assign twice in UMD bundles:\n  assign: _assign\n};\n\n{\n  _assign(ReactSharedInternals, {\n    // These should not be included in production.\n    ReactDebugCurrentFrame: ReactDebugCurrentFrame,\n    // Shim for React DOM 16.0.0 which still destructured (but not used) this.\n    // TODO: remove in React 17.0.\n    ReactComponentTreeHook: {}\n  });\n}\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warning = warningWithoutStack$1;\n\n{\n  warning = function (condition, format) {\n    if (condition) {\n      return;\n    }\n\n    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;\n    var stack = ReactDebugCurrentFrame.getStackAddendum(); // eslint-disable-next-line react-internal/warning-and-invariant-args\n\n    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      args[_key - 2] = arguments[_key];\n    }\n\n    warningWithoutStack$1.apply(void 0, [false, format + '%s'].concat(args, [stack]));\n  };\n}\n\nvar warning$1 = warning;\n\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar RESERVED_PROPS = {\n  key: true,\n  ref: true,\n  __self: true,\n  __source: true\n};\nvar specialPropKeyWarningShown;\nvar specialPropRefWarningShown;\n\nfunction hasValidRef(config) {\n  {\n    if (hasOwnProperty.call(config, 'ref')) {\n      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;\n\n      if (getter && getter.isReactWarning) {\n        return false;\n      }\n    }\n  }\n\n  return config.ref !== undefined;\n}\n\nfunction hasValidKey(config) {\n  {\n    if (hasOwnProperty.call(config, 'key')) {\n      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;\n\n      if (getter && getter.isReactWarning) {\n        return false;\n      }\n    }\n  }\n\n  return config.key !== undefined;\n}\n\nfunction defineKeyPropWarningGetter(props, displayName) {\n  var warnAboutAccessingKey = function () {\n    if (!specialPropKeyWarningShown) {\n      specialPropKeyWarningShown = true;\n      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);\n    }\n  };\n\n  warnAboutAccessingKey.isReactWarning = true;\n  Object.defineProperty(props, 'key', {\n    get: warnAboutAccessingKey,\n    configurable: true\n  });\n}\n\nfunction defineRefPropWarningGetter(props, displayName) {\n  var warnAboutAccessingRef = function () {\n    if (!specialPropRefWarningShown) {\n      specialPropRefWarningShown = true;\n      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);\n    }\n  };\n\n  warnAboutAccessingRef.isReactWarning = true;\n  Object.defineProperty(props, 'ref', {\n    get: warnAboutAccessingRef,\n    configurable: true\n  });\n}\n/**\n * Factory method to create a new React element. This no longer adheres to\n * the class pattern, so do not use new to call it. Also, no instanceof check\n * will work. Instead test $$typeof field against Symbol.for('react.element') to check\n * if something is a React Element.\n *\n * @param {*} type\n * @param {*} props\n * @param {*} key\n * @param {string|object} ref\n * @param {*} owner\n * @param {*} self A *temporary* helper to detect places where `this` is\n * different from the `owner` when React.createElement is called, so that we\n * can warn. We want to get rid of owner and replace string `ref`s with arrow\n * functions, and as long as `this` and owner are the same, there will be no\n * change in behavior.\n * @param {*} source An annotation object (added by a transpiler or otherwise)\n * indicating filename, line number, and/or other information.\n * @internal\n */\n\n\nvar ReactElement = function (type, key, ref, self, source, owner, props) {\n  var element = {\n    // This tag allows us to uniquely identify this as a React Element\n    $$typeof: REACT_ELEMENT_TYPE,\n    // Built-in properties that belong on the element\n    type: type,\n    key: key,\n    ref: ref,\n    props: props,\n    // Record the component responsible for creating this element.\n    _owner: owner\n  };\n\n  {\n    // The validation flag is currently mutative. We put it on\n    // an external backing store so that we can freeze the whole object.\n    // This can be replaced with a WeakMap once they are implemented in\n    // commonly used development environments.\n    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make\n    // the validation flag non-enumerable (where possible, which should\n    // include every environment we run tests in), so the test framework\n    // ignores it.\n\n    Object.defineProperty(element._store, 'validated', {\n      configurable: false,\n      enumerable: false,\n      writable: true,\n      value: false\n    }); // self and source are DEV only properties.\n\n    Object.defineProperty(element, '_self', {\n      configurable: false,\n      enumerable: false,\n      writable: false,\n      value: self\n    }); // Two elements created in two different places should be considered\n    // equal for testing purposes and therefore we hide it from enumeration.\n\n    Object.defineProperty(element, '_source', {\n      configurable: false,\n      enumerable: false,\n      writable: false,\n      value: source\n    });\n\n    if (Object.freeze) {\n      Object.freeze(element.props);\n      Object.freeze(element);\n    }\n  }\n\n  return element;\n};\n/**\n * https://github.com/reactjs/rfcs/pull/107\n * @param {*} type\n * @param {object} props\n * @param {string} key\n */\n\n\n\n/**\n * https://github.com/reactjs/rfcs/pull/107\n * @param {*} type\n * @param {object} props\n * @param {string} key\n */\n\nfunction jsxDEV(type, config, maybeKey, source, self) {\n  var propName; // Reserved names are extracted\n\n  var props = {};\n  var key = null;\n  var ref = null; // Currently, key can be spread in as a prop. This causes a potential\n  // issue if key is also explicitly declared (ie. <div {...props} key=\"Hi\" />\n  // or <div key=\"Hi\" {...props} /> ). We want to deprecate key spread,\n  // but as an intermediary step, we will use jsxDEV for everything except\n  // <div {...props} key=\"Hi\" />, because we aren't currently able to tell if\n  // key is explicitly declared to be undefined or not.\n\n  if (maybeKey !== undefined) {\n    key = '' + maybeKey;\n  }\n\n  if (hasValidKey(config)) {\n    key = '' + config.key;\n  }\n\n  if (hasValidRef(config)) {\n    ref = config.ref;\n  } // Remaining properties are added to a new props object\n\n\n  for (propName in config) {\n    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n      props[propName] = config[propName];\n    }\n  } // Resolve default props\n\n\n  if (type && type.defaultProps) {\n    var defaultProps = type.defaultProps;\n\n    for (propName in defaultProps) {\n      if (props[propName] === undefined) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  }\n\n  if (key || ref) {\n    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;\n\n    if (key) {\n      defineKeyPropWarningGetter(props, displayName);\n    }\n\n    if (ref) {\n      defineRefPropWarningGetter(props, displayName);\n    }\n  }\n\n  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);\n}\n/**\n * Create and return a new ReactElement of the given type.\n * See https://reactjs.org/docs/react-api.html#createelement\n */\n\nfunction createElement(type, config, children) {\n  var propName; // Reserved names are extracted\n\n  var props = {};\n  var key = null;\n  var ref = null;\n  var self = null;\n  var source = null;\n\n  if (config != null) {\n    if (hasValidRef(config)) {\n      ref = config.ref;\n    }\n\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    }\n\n    self = config.__self === undefined ? null : config.__self;\n    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object\n\n    for (propName in config) {\n      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n        props[propName] = config[propName];\n      }\n    }\n  } // Children can be more than one argument, and those are transferred onto\n  // the newly allocated props object.\n\n\n  var childrenLength = arguments.length - 2;\n\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = Array(childrenLength);\n\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n\n    {\n      if (Object.freeze) {\n        Object.freeze(childArray);\n      }\n    }\n\n    props.children = childArray;\n  } // Resolve default props\n\n\n  if (type && type.defaultProps) {\n    var defaultProps = type.defaultProps;\n\n    for (propName in defaultProps) {\n      if (props[propName] === undefined) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  }\n\n  {\n    if (key || ref) {\n      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;\n\n      if (key) {\n        defineKeyPropWarningGetter(props, displayName);\n      }\n\n      if (ref) {\n        defineRefPropWarningGetter(props, displayName);\n      }\n    }\n  }\n\n  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);\n}\n/**\n * Return a function that produces ReactElements of a given type.\n * See https://reactjs.org/docs/react-api.html#createfactory\n */\n\n\nfunction cloneAndReplaceKey(oldElement, newKey) {\n  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);\n  return newElement;\n}\n/**\n * Clone and return a new ReactElement using element as the starting point.\n * See https://reactjs.org/docs/react-api.html#cloneelement\n */\n\nfunction cloneElement(element, config, children) {\n  (function () {\n    if (!!(element === null || element === undefined)) {\n      {\n        throw ReactError(Error(\"React.cloneElement(...): The argument must be a React element, but you passed \" + element + \".\"));\n      }\n    }\n  })();\n\n  var propName; // Original props are copied\n\n  var props = _assign({}, element.props); // Reserved names are extracted\n\n\n  var key = element.key;\n  var ref = element.ref; // Self is preserved since the owner is preserved.\n\n  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a\n  // transpiler, and the original source is probably a better indicator of the\n  // true owner.\n\n  var source = element._source; // Owner will be preserved, unless ref is overridden\n\n  var owner = element._owner;\n\n  if (config != null) {\n    if (hasValidRef(config)) {\n      // Silently steal the ref from the parent.\n      ref = config.ref;\n      owner = ReactCurrentOwner.current;\n    }\n\n    if (hasValidKey(config)) {\n      key = '' + config.key;\n    } // Remaining properties override existing props\n\n\n    var defaultProps;\n\n    if (element.type && element.type.defaultProps) {\n      defaultProps = element.type.defaultProps;\n    }\n\n    for (propName in config) {\n      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {\n        if (config[propName] === undefined && defaultProps !== undefined) {\n          // Resolve default props\n          props[propName] = defaultProps[propName];\n        } else {\n          props[propName] = config[propName];\n        }\n      }\n    }\n  } // Children can be more than one argument, and those are transferred onto\n  // the newly allocated props object.\n\n\n  var childrenLength = arguments.length - 2;\n\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = Array(childrenLength);\n\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 2];\n    }\n\n    props.children = childArray;\n  }\n\n  return ReactElement(element.type, key, ref, self, source, owner, props);\n}\n/**\n * Verifies the object is a ReactElement.\n * See https://reactjs.org/docs/react-api.html#isvalidelement\n * @param {?object} object\n * @return {boolean} True if `object` is a ReactElement.\n * @final\n */\n\nfunction isValidElement(object) {\n  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n}\n\nvar SEPARATOR = '.';\nvar SUBSEPARATOR = ':';\n/**\n * Escape and wrap key so it is safe to use as a reactid\n *\n * @param {string} key to be escaped.\n * @return {string} the escaped key.\n */\n\nfunction escape(key) {\n  var escapeRegex = /[=:]/g;\n  var escaperLookup = {\n    '=': '=0',\n    ':': '=2'\n  };\n  var escapedString = ('' + key).replace(escapeRegex, function (match) {\n    return escaperLookup[match];\n  });\n  return '$' + escapedString;\n}\n/**\n * TODO: Test that a single child and an array with one item have the same key\n * pattern.\n */\n\n\nvar didWarnAboutMaps = false;\nvar userProvidedKeyEscapeRegex = /\\/+/g;\n\nfunction escapeUserProvidedKey(text) {\n  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');\n}\n\nvar POOL_SIZE = 10;\nvar traverseContextPool = [];\n\nfunction getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {\n  if (traverseContextPool.length) {\n    var traverseContext = traverseContextPool.pop();\n    traverseContext.result = mapResult;\n    traverseContext.keyPrefix = keyPrefix;\n    traverseContext.func = mapFunction;\n    traverseContext.context = mapContext;\n    traverseContext.count = 0;\n    return traverseContext;\n  } else {\n    return {\n      result: mapResult,\n      keyPrefix: keyPrefix,\n      func: mapFunction,\n      context: mapContext,\n      count: 0\n    };\n  }\n}\n\nfunction releaseTraverseContext(traverseContext) {\n  traverseContext.result = null;\n  traverseContext.keyPrefix = null;\n  traverseContext.func = null;\n  traverseContext.context = null;\n  traverseContext.count = 0;\n\n  if (traverseContextPool.length < POOL_SIZE) {\n    traverseContextPool.push(traverseContext);\n  }\n}\n/**\n * @param {?*} children Children tree container.\n * @param {!string} nameSoFar Name of the key path so far.\n * @param {!function} callback Callback to invoke with each child found.\n * @param {?*} traverseContext Used to pass information throughout the traversal\n * process.\n * @return {!number} The number of children in this subtree.\n */\n\n\nfunction traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {\n  var type = typeof children;\n\n  if (type === 'undefined' || type === 'boolean') {\n    // All of the above are perceived as null.\n    children = null;\n  }\n\n  var invokeCallback = false;\n\n  if (children === null) {\n    invokeCallback = true;\n  } else {\n    switch (type) {\n      case 'string':\n      case 'number':\n        invokeCallback = true;\n        break;\n\n      case 'object':\n        switch (children.$$typeof) {\n          case REACT_ELEMENT_TYPE:\n          case REACT_PORTAL_TYPE:\n            invokeCallback = true;\n        }\n\n    }\n  }\n\n  if (invokeCallback) {\n    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array\n    // so that it's consistent if the number of children grows.\n    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);\n    return 1;\n  }\n\n  var child;\n  var nextName;\n  var subtreeCount = 0; // Count of children found in the current subtree.\n\n  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;\n\n  if (Array.isArray(children)) {\n    for (var i = 0; i < children.length; i++) {\n      child = children[i];\n      nextName = nextNamePrefix + getComponentKey(child, i);\n      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);\n    }\n  } else {\n    var iteratorFn = getIteratorFn(children);\n\n    if (typeof iteratorFn === 'function') {\n      {\n        // Warn about using Maps as children\n        if (iteratorFn === children.entries) {\n          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;\n          didWarnAboutMaps = true;\n        }\n      }\n\n      var iterator = iteratorFn.call(children);\n      var step;\n      var ii = 0;\n\n      while (!(step = iterator.next()).done) {\n        child = step.value;\n        nextName = nextNamePrefix + getComponentKey(child, ii++);\n        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);\n      }\n    } else if (type === 'object') {\n      var addendum = '';\n\n      {\n        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();\n      }\n\n      var childrenString = '' + children;\n\n      (function () {\n        {\n          {\n            throw ReactError(Error(\"Objects are not valid as a React child (found: \" + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + \").\" + addendum));\n          }\n        }\n      })();\n    }\n  }\n\n  return subtreeCount;\n}\n/**\n * Traverses children that are typically specified as `props.children`, but\n * might also be specified through attributes:\n *\n * - `traverseAllChildren(this.props.children, ...)`\n * - `traverseAllChildren(this.props.leftPanelChildren, ...)`\n *\n * The `traverseContext` is an optional argument that is passed through the\n * entire traversal. It can be used to store accumulations or anything else that\n * the callback might find relevant.\n *\n * @param {?*} children Children tree object.\n * @param {!function} callback To invoke upon traversing each child.\n * @param {?*} traverseContext Context for traversal.\n * @return {!number} The number of children in this subtree.\n */\n\n\nfunction traverseAllChildren(children, callback, traverseContext) {\n  if (children == null) {\n    return 0;\n  }\n\n  return traverseAllChildrenImpl(children, '', callback, traverseContext);\n}\n/**\n * Generate a key string that identifies a component within a set.\n *\n * @param {*} component A component that could contain a manual key.\n * @param {number} index Index that is used if a manual key is not provided.\n * @return {string}\n */\n\n\nfunction getComponentKey(component, index) {\n  // Do some typechecking here since we call this blindly. We want to ensure\n  // that we don't block potential future ES APIs.\n  if (typeof component === 'object' && component !== null && component.key != null) {\n    // Explicit key\n    return escape(component.key);\n  } // Implicit key determined by the index in the set\n\n\n  return index.toString(36);\n}\n\nfunction forEachSingleChild(bookKeeping, child, name) {\n  var func = bookKeeping.func,\n      context = bookKeeping.context;\n  func.call(context, child, bookKeeping.count++);\n}\n/**\n * Iterates through children that are typically specified as `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenforeach\n *\n * The provided forEachFunc(child, index) will be called for each\n * leaf child.\n *\n * @param {?*} children Children tree container.\n * @param {function(*, int)} forEachFunc\n * @param {*} forEachContext Context for forEachContext.\n */\n\n\nfunction forEachChildren(children, forEachFunc, forEachContext) {\n  if (children == null) {\n    return children;\n  }\n\n  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);\n  traverseAllChildren(children, forEachSingleChild, traverseContext);\n  releaseTraverseContext(traverseContext);\n}\n\nfunction mapSingleChildIntoContext(bookKeeping, child, childKey) {\n  var result = bookKeeping.result,\n      keyPrefix = bookKeeping.keyPrefix,\n      func = bookKeeping.func,\n      context = bookKeeping.context;\n  var mappedChild = func.call(context, child, bookKeeping.count++);\n\n  if (Array.isArray(mappedChild)) {\n    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {\n      return c;\n    });\n  } else if (mappedChild != null) {\n    if (isValidElement(mappedChild)) {\n      mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as\n      // traverseAllChildren used to do for objects as children\n      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);\n    }\n\n    result.push(mappedChild);\n  }\n}\n\nfunction mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {\n  var escapedPrefix = '';\n\n  if (prefix != null) {\n    escapedPrefix = escapeUserProvidedKey(prefix) + '/';\n  }\n\n  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);\n  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);\n  releaseTraverseContext(traverseContext);\n}\n/**\n * Maps children that are typically specified as `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenmap\n *\n * The provided mapFunction(child, key, index) will be called for each\n * leaf child.\n *\n * @param {?*} children Children tree container.\n * @param {function(*, int)} func The map function.\n * @param {*} context Context for mapFunction.\n * @return {object} Object containing the ordered map of results.\n */\n\n\nfunction mapChildren(children, func, context) {\n  if (children == null) {\n    return children;\n  }\n\n  var result = [];\n  mapIntoWithKeyPrefixInternal(children, result, null, func, context);\n  return result;\n}\n/**\n * Count the number of children that are typically specified as\n * `props.children`.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrencount\n *\n * @param {?*} children Children tree container.\n * @return {number} The number of children.\n */\n\n\nfunction countChildren(children) {\n  return traverseAllChildren(children, function () {\n    return null;\n  }, null);\n}\n/**\n * Flatten a children object (typically specified as `props.children`) and\n * return an array with appropriately re-keyed children.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrentoarray\n */\n\n\nfunction toArray(children) {\n  var result = [];\n  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {\n    return child;\n  });\n  return result;\n}\n/**\n * Returns the first child in a collection of children and verifies that there\n * is only one child in the collection.\n *\n * See https://reactjs.org/docs/react-api.html#reactchildrenonly\n *\n * The current implementation of this function assumes that a single child gets\n * passed without a wrapper, but the purpose of this helper function is to\n * abstract away the particular structure of children.\n *\n * @param {?object} children Child collection structure.\n * @return {ReactElement} The first and only `ReactElement` contained in the\n * structure.\n */\n\n\nfunction onlyChild(children) {\n  (function () {\n    if (!isValidElement(children)) {\n      {\n        throw ReactError(Error(\"React.Children.only expected to receive a single React element child.\"));\n      }\n    }\n  })();\n\n  return children;\n}\n\nfunction createContext(defaultValue, calculateChangedBits) {\n  if (calculateChangedBits === undefined) {\n    calculateChangedBits = null;\n  } else {\n    {\n      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;\n    }\n  }\n\n  var context = {\n    $$typeof: REACT_CONTEXT_TYPE,\n    _calculateChangedBits: calculateChangedBits,\n    // As a workaround to support multiple concurrent renderers, we categorize\n    // some renderers as primary and others as secondary. We only expect\n    // there to be two concurrent renderers at most: React Native (primary) and\n    // Fabric (secondary); React DOM (primary) and React ART (secondary).\n    // Secondary renderers store their context values on separate fields.\n    _currentValue: defaultValue,\n    _currentValue2: defaultValue,\n    // Used to track how many concurrent renderers this context currently\n    // supports within in a single renderer. Such as parallel server rendering.\n    _threadCount: 0,\n    // These are circular\n    Provider: null,\n    Consumer: null\n  };\n  context.Provider = {\n    $$typeof: REACT_PROVIDER_TYPE,\n    _context: context\n  };\n  var hasWarnedAboutUsingNestedContextConsumers = false;\n  var hasWarnedAboutUsingConsumerProvider = false;\n\n  {\n    // A separate object, but proxies back to the original context object for\n    // backwards compatibility. It has a different $$typeof, so we can properly\n    // warn for the incorrect usage of Context as a Consumer.\n    var Consumer = {\n      $$typeof: REACT_CONTEXT_TYPE,\n      _context: context,\n      _calculateChangedBits: context._calculateChangedBits\n    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here\n\n    Object.defineProperties(Consumer, {\n      Provider: {\n        get: function () {\n          if (!hasWarnedAboutUsingConsumerProvider) {\n            hasWarnedAboutUsingConsumerProvider = true;\n            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');\n          }\n\n          return context.Provider;\n        },\n        set: function (_Provider) {\n          context.Provider = _Provider;\n        }\n      },\n      _currentValue: {\n        get: function () {\n          return context._currentValue;\n        },\n        set: function (_currentValue) {\n          context._currentValue = _currentValue;\n        }\n      },\n      _currentValue2: {\n        get: function () {\n          return context._currentValue2;\n        },\n        set: function (_currentValue2) {\n          context._currentValue2 = _currentValue2;\n        }\n      },\n      _threadCount: {\n        get: function () {\n          return context._threadCount;\n        },\n        set: function (_threadCount) {\n          context._threadCount = _threadCount;\n        }\n      },\n      Consumer: {\n        get: function () {\n          if (!hasWarnedAboutUsingNestedContextConsumers) {\n            hasWarnedAboutUsingNestedContextConsumers = true;\n            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');\n          }\n\n          return context.Consumer;\n        }\n      }\n    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty\n\n    context.Consumer = Consumer;\n  }\n\n  {\n    context._currentRenderer = null;\n    context._currentRenderer2 = null;\n  }\n\n  return context;\n}\n\nfunction lazy(ctor) {\n  var lazyType = {\n    $$typeof: REACT_LAZY_TYPE,\n    _ctor: ctor,\n    // React uses these fields to store the result.\n    _status: -1,\n    _result: null\n  };\n\n  {\n    // In production, this would just set it on the object.\n    var defaultProps;\n    var propTypes;\n    Object.defineProperties(lazyType, {\n      defaultProps: {\n        configurable: true,\n        get: function () {\n          return defaultProps;\n        },\n        set: function (newDefaultProps) {\n          warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n          defaultProps = newDefaultProps; // Match production behavior more closely:\n\n          Object.defineProperty(lazyType, 'defaultProps', {\n            enumerable: true\n          });\n        }\n      },\n      propTypes: {\n        configurable: true,\n        get: function () {\n          return propTypes;\n        },\n        set: function (newPropTypes) {\n          warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');\n          propTypes = newPropTypes; // Match production behavior more closely:\n\n          Object.defineProperty(lazyType, 'propTypes', {\n            enumerable: true\n          });\n        }\n      }\n    });\n  }\n\n  return lazyType;\n}\n\nfunction forwardRef(render) {\n  {\n    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {\n      warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');\n    } else if (typeof render !== 'function') {\n      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);\n    } else {\n      !( // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object\n      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;\n    }\n\n    if (render != null) {\n      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;\n    }\n  }\n\n  return {\n    $$typeof: REACT_FORWARD_REF_TYPE,\n    render: render\n  };\n}\n\nfunction isValidElementType(type) {\n  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.\n  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);\n}\n\nfunction memo(type, compare) {\n  {\n    if (!isValidElementType(type)) {\n      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);\n    }\n  }\n\n  return {\n    $$typeof: REACT_MEMO_TYPE,\n    type: type,\n    compare: compare === undefined ? null : compare\n  };\n}\n\nfunction resolveDispatcher() {\n  var dispatcher = ReactCurrentDispatcher.current;\n\n  (function () {\n    if (!(dispatcher !== null)) {\n      {\n        throw ReactError(Error(\"Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\\n1. You might have mismatching versions of React and the renderer (such as React DOM)\\n2. You might be breaking the Rules of Hooks\\n3. You might have more than one copy of React in the same app\\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.\"));\n      }\n    }\n  })();\n\n  return dispatcher;\n}\n\nfunction useContext(Context, unstable_observedBits) {\n  var dispatcher = resolveDispatcher();\n\n  {\n    !(unstable_observedBits === undefined) ? warning$1(false, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\\n\\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '') : void 0; // TODO: add a more generic warning for invalid values.\n\n    if (Context._context !== undefined) {\n      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs\n      // and nobody should be using this in existing code.\n\n      if (realContext.Consumer === Context) {\n        warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');\n      } else if (realContext.Provider === Context) {\n        warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');\n      }\n    }\n  }\n\n  return dispatcher.useContext(Context, unstable_observedBits);\n}\nfunction useState(initialState) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useState(initialState);\n}\nfunction useReducer(reducer, initialArg, init) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useReducer(reducer, initialArg, init);\n}\nfunction useRef(initialValue) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useRef(initialValue);\n}\nfunction useEffect(create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useEffect(create, inputs);\n}\nfunction useLayoutEffect(create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useLayoutEffect(create, inputs);\n}\nfunction useCallback(callback, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useCallback(callback, inputs);\n}\nfunction useMemo(create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useMemo(create, inputs);\n}\nfunction useImperativeHandle(ref, create, inputs) {\n  var dispatcher = resolveDispatcher();\n  return dispatcher.useImperativeHandle(ref, create, inputs);\n}\nfunction useDebugValue(value, formatterFn) {\n  {\n    var dispatcher = resolveDispatcher();\n    return dispatcher.useDebugValue(value, formatterFn);\n  }\n}\nvar emptyObject$1 = {};\nfunction useResponder(responder, listenerProps) {\n  var dispatcher = resolveDispatcher();\n\n  {\n    if (responder == null || responder.$$typeof !== REACT_RESPONDER_TYPE) {\n      warning$1(false, 'useResponder: invalid first argument. Expected an event responder, but instead got %s', responder);\n      return;\n    }\n  }\n\n  return dispatcher.useResponder(responder, listenerProps || emptyObject$1);\n}\n\nfunction withSuspenseConfig(scope, config) {\n  var previousConfig = ReactCurrentBatchConfig.suspense;\n  ReactCurrentBatchConfig.suspense = config === undefined ? null : config;\n\n  try {\n    scope();\n  } finally {\n    ReactCurrentBatchConfig.suspense = previousConfig;\n  }\n}\n\n/**\n * ReactElementValidator provides a wrapper around a element factory\n * which validates the props passed to the element. This is intended to be\n * used only in DEV and could be replaced by a static type checker for languages\n * that support it.\n */\nvar propTypesMisspellWarningShown;\n\n{\n  propTypesMisspellWarningShown = false;\n}\n\nvar hasOwnProperty$1 = Object.prototype.hasOwnProperty;\n\nfunction getDeclarationErrorAddendum() {\n  if (ReactCurrentOwner.current) {\n    var name = getComponentName(ReactCurrentOwner.current.type);\n\n    if (name) {\n      return '\\n\\nCheck the render method of `' + name + '`.';\n    }\n  }\n\n  return '';\n}\n\nfunction getSourceInfoErrorAddendum(source) {\n  if (source !== undefined) {\n    var fileName = source.fileName.replace(/^.*[\\\\\\/]/, '');\n    var lineNumber = source.lineNumber;\n    return '\\n\\nCheck your code at ' + fileName + ':' + lineNumber + '.';\n  }\n\n  return '';\n}\n\nfunction getSourceInfoErrorAddendumForProps(elementProps) {\n  if (elementProps !== null && elementProps !== undefined) {\n    return getSourceInfoErrorAddendum(elementProps.__source);\n  }\n\n  return '';\n}\n/**\n * Warn if there's no key explicitly set on dynamic arrays of children or\n * object keys are not valid. This allows us to keep track of children between\n * updates.\n */\n\n\nvar ownerHasKeyUseWarning = {};\n\nfunction getCurrentComponentErrorInfo(parentType) {\n  var info = getDeclarationErrorAddendum();\n\n  if (!info) {\n    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;\n\n    if (parentName) {\n      info = \"\\n\\nCheck the top-level render call using <\" + parentName + \">.\";\n    }\n  }\n\n  return info;\n}\n/**\n * Warn if the element doesn't have an explicit key assigned to it.\n * This element is in an array. The array could grow and shrink or be\n * reordered. All children that haven't already been validated are required to\n * have a \"key\" property assigned to it. Error statuses are cached so a warning\n * will only be shown once.\n *\n * @internal\n * @param {ReactElement} element Element that requires a key.\n * @param {*} parentType element's parent's type.\n */\n\n\nfunction validateExplicitKey(element, parentType) {\n  if (!element._store || element._store.validated || element.key != null) {\n    return;\n  }\n\n  element._store.validated = true;\n  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);\n\n  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {\n    return;\n  }\n\n  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a\n  // property, it may be the creator of the child that's responsible for\n  // assigning it a key.\n\n  var childOwner = '';\n\n  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {\n    // Give the component that originally created this child.\n    childOwner = \" It was passed a child from \" + getComponentName(element._owner.type) + \".\";\n  }\n\n  setCurrentlyValidatingElement(element);\n\n  {\n    warning$1(false, 'Each child in a list should have a unique \"key\" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);\n  }\n\n  setCurrentlyValidatingElement(null);\n}\n/**\n * Ensure that every element either is passed in a static location, in an\n * array with an explicit keys property defined, or in an object literal\n * with valid key property.\n *\n * @internal\n * @param {ReactNode} node Statically passed child of any type.\n * @param {*} parentType node's parent's type.\n */\n\n\nfunction validateChildKeys(node, parentType) {\n  if (typeof node !== 'object') {\n    return;\n  }\n\n  if (Array.isArray(node)) {\n    for (var i = 0; i < node.length; i++) {\n      var child = node[i];\n\n      if (isValidElement(child)) {\n        validateExplicitKey(child, parentType);\n      }\n    }\n  } else if (isValidElement(node)) {\n    // This element was passed in a valid location.\n    if (node._store) {\n      node._store.validated = true;\n    }\n  } else if (node) {\n    var iteratorFn = getIteratorFn(node);\n\n    if (typeof iteratorFn === 'function') {\n      // Entry iterators used to provide implicit keys,\n      // but now we print a separate warning for them later.\n      if (iteratorFn !== node.entries) {\n        var iterator = iteratorFn.call(node);\n        var step;\n\n        while (!(step = iterator.next()).done) {\n          if (isValidElement(step.value)) {\n            validateExplicitKey(step.value, parentType);\n          }\n        }\n      }\n    }\n  }\n}\n/**\n * Given an element, validate that its props follow the propTypes definition,\n * provided by the type.\n *\n * @param {ReactElement} element\n */\n\n\nfunction validatePropTypes(element) {\n  var type = element.type;\n\n  if (type === null || type === undefined || typeof type === 'string') {\n    return;\n  }\n\n  var name = getComponentName(type);\n  var propTypes;\n\n  if (typeof type === 'function') {\n    propTypes = type.propTypes;\n  } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.\n  // Inner props are checked in the reconciler.\n  type.$$typeof === REACT_MEMO_TYPE)) {\n    propTypes = type.propTypes;\n  } else {\n    return;\n  }\n\n  if (propTypes) {\n    setCurrentlyValidatingElement(element);\n    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);\n    setCurrentlyValidatingElement(null);\n  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {\n    propTypesMisspellWarningShown = true;\n    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');\n  }\n\n  if (typeof type.getDefaultProps === 'function') {\n    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;\n  }\n}\n/**\n * Given a fragment, validate that it can only be provided with fragment props\n * @param {ReactElement} fragment\n */\n\n\nfunction validateFragmentProps(fragment) {\n  setCurrentlyValidatingElement(fragment);\n  var keys = Object.keys(fragment.props);\n\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n\n    if (key !== 'children' && key !== 'key') {\n      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);\n      break;\n    }\n  }\n\n  if (fragment.ref !== null) {\n    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');\n  }\n\n  setCurrentlyValidatingElement(null);\n}\n\nfunction jsxWithValidation(type, props, key, isStaticChildren, source, self) {\n  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to\n  // succeed and there will likely be errors in render.\n\n  if (!validType) {\n    var info = '';\n\n    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {\n      info += ' You likely forgot to export your component from the file ' + \"it's defined in, or you might have mixed up default and named imports.\";\n    }\n\n    var sourceInfo = getSourceInfoErrorAddendum(source);\n\n    if (sourceInfo) {\n      info += sourceInfo;\n    } else {\n      info += getDeclarationErrorAddendum();\n    }\n\n    var typeString;\n\n    if (type === null) {\n      typeString = 'null';\n    } else if (Array.isArray(type)) {\n      typeString = 'array';\n    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {\n      typeString = \"<\" + (getComponentName(type.type) || 'Unknown') + \" />\";\n      info = ' Did you accidentally export a JSX literal instead of a component?';\n    } else {\n      typeString = typeof type;\n    }\n\n    warning$1(false, 'React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);\n  }\n\n  var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.\n  // TODO: Drop this when these are no longer allowed as the type argument.\n\n  if (element == null) {\n    return element;\n  } // Skip key warning if the type isn't valid since our key validation logic\n  // doesn't expect a non-string/function type and can throw confusing errors.\n  // We don't want exception behavior to differ between dev and prod.\n  // (Rendering will throw with a helpful message and as soon as the type is\n  // fixed, the key warnings will appear.)\n\n\n  if (validType) {\n    var children = props.children;\n\n    if (children !== undefined) {\n      if (isStaticChildren) {\n        if (Array.isArray(children)) {\n          for (var i = 0; i < children.length; i++) {\n            validateChildKeys(children[i], type);\n          }\n\n          if (Object.freeze) {\n            Object.freeze(children);\n          }\n        } else {\n          warning$1(false, 'React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');\n        }\n      } else {\n        validateChildKeys(children, type);\n      }\n    }\n  }\n\n  if (hasOwnProperty$1.call(props, 'key')) {\n    warning$1(false, 'React.jsx: Spreading a key to JSX is a deprecated pattern. ' + 'Explicitly pass a key after spreading props in your JSX call. ' + 'E.g. <ComponentName {...props} key={key} />');\n  }\n\n  if (type === REACT_FRAGMENT_TYPE) {\n    validateFragmentProps(element);\n  } else {\n    validatePropTypes(element);\n  }\n\n  return element;\n} // These two functions exist to still get child warnings in dev\n// even with the prod transform. This means that jsxDEV is purely\n// opt-in behavior for better messages but that we won't stop\n// giving you warnings if you use production apis.\n\nfunction jsxWithValidationStatic(type, props, key) {\n  return jsxWithValidation(type, props, key, true);\n}\nfunction jsxWithValidationDynamic(type, props, key) {\n  return jsxWithValidation(type, props, key, false);\n}\nfunction createElementWithValidation(type, props, children) {\n  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to\n  // succeed and there will likely be errors in render.\n\n  if (!validType) {\n    var info = '';\n\n    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {\n      info += ' You likely forgot to export your component from the file ' + \"it's defined in, or you might have mixed up default and named imports.\";\n    }\n\n    var sourceInfo = getSourceInfoErrorAddendumForProps(props);\n\n    if (sourceInfo) {\n      info += sourceInfo;\n    } else {\n      info += getDeclarationErrorAddendum();\n    }\n\n    var typeString;\n\n    if (type === null) {\n      typeString = 'null';\n    } else if (Array.isArray(type)) {\n      typeString = 'array';\n    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {\n      typeString = \"<\" + (getComponentName(type.type) || 'Unknown') + \" />\";\n      info = ' Did you accidentally export a JSX literal instead of a component?';\n    } else {\n      typeString = typeof type;\n    }\n\n    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);\n  }\n\n  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.\n  // TODO: Drop this when these are no longer allowed as the type argument.\n\n  if (element == null) {\n    return element;\n  } // Skip key warning if the type isn't valid since our key validation logic\n  // doesn't expect a non-string/function type and can throw confusing errors.\n  // We don't want exception behavior to differ between dev and prod.\n  // (Rendering will throw with a helpful message and as soon as the type is\n  // fixed, the key warnings will appear.)\n\n\n  if (validType) {\n    for (var i = 2; i < arguments.length; i++) {\n      validateChildKeys(arguments[i], type);\n    }\n  }\n\n  if (type === REACT_FRAGMENT_TYPE) {\n    validateFragmentProps(element);\n  } else {\n    validatePropTypes(element);\n  }\n\n  return element;\n}\nfunction createFactoryWithValidation(type) {\n  var validatedFactory = createElementWithValidation.bind(null, type);\n  validatedFactory.type = type; // Legacy hook: remove it\n\n  {\n    Object.defineProperty(validatedFactory, 'type', {\n      enumerable: false,\n      get: function () {\n        lowPriorityWarningWithoutStack$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');\n        Object.defineProperty(this, 'type', {\n          value: type\n        });\n        return type;\n      }\n    });\n  }\n\n  return validatedFactory;\n}\nfunction cloneElementWithValidation(element, props, children) {\n  var newElement = cloneElement.apply(this, arguments);\n\n  for (var i = 2; i < arguments.length; i++) {\n    validateChildKeys(arguments[i], newElement.type);\n  }\n\n  validatePropTypes(newElement);\n  return newElement;\n}\n\nvar hasBadMapPolyfill;\n\n{\n  hasBadMapPolyfill = false;\n\n  try {\n    var frozenObject = Object.freeze({});\n    var testMap = new Map([[frozenObject, null]]);\n    var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.\n    // https://github.com/rollup/rollup/issues/1771\n    // TODO: we can remove these if Rollup fixes the bug.\n\n    testMap.set(0, 0);\n    testSet.add(0);\n  } catch (e) {\n    // TODO: Consider warning about bad polyfills\n    hasBadMapPolyfill = true;\n  }\n}\n\nfunction createFundamentalComponent(impl) {\n  // We use responder as a Map key later on. When we have a bad\n  // polyfill, then we can't use it as a key as the polyfill tries\n  // to add a property to the object.\n  if ( true && !hasBadMapPolyfill) {\n    Object.freeze(impl);\n  }\n\n  var fundamantalComponent = {\n    $$typeof: REACT_FUNDAMENTAL_TYPE,\n    impl: impl\n  };\n\n  {\n    Object.freeze(fundamantalComponent);\n  }\n\n  return fundamantalComponent;\n}\n\nfunction createEventResponder(displayName, responderConfig) {\n  var getInitialState = responderConfig.getInitialState,\n      onEvent = responderConfig.onEvent,\n      onMount = responderConfig.onMount,\n      onUnmount = responderConfig.onUnmount,\n      onRootEvent = responderConfig.onRootEvent,\n      rootEventTypes = responderConfig.rootEventTypes,\n      targetEventTypes = responderConfig.targetEventTypes,\n      targetPortalPropagation = responderConfig.targetPortalPropagation;\n  var eventResponder = {\n    $$typeof: REACT_RESPONDER_TYPE,\n    displayName: displayName,\n    getInitialState: getInitialState || null,\n    onEvent: onEvent || null,\n    onMount: onMount || null,\n    onRootEvent: onRootEvent || null,\n    onUnmount: onUnmount || null,\n    rootEventTypes: rootEventTypes || null,\n    targetEventTypes: targetEventTypes || null,\n    targetPortalPropagation: targetPortalPropagation || false\n  }; // We use responder as a Map key later on. When we have a bad\n  // polyfill, then we can't use it as a key as the polyfill tries\n  // to add a property to the object.\n\n  if ( true && !hasBadMapPolyfill) {\n    Object.freeze(eventResponder);\n  }\n\n  return eventResponder;\n}\n\nfunction createScope(fn) {\n  var scopeComponent = {\n    $$typeof: REACT_SCOPE_TYPE,\n    fn: fn\n  };\n\n  {\n    Object.freeze(scopeComponent);\n  }\n\n  return scopeComponent;\n}\n\n// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:\n\n // In some cases, StrictMode should also double-render lifecycles.\n// This can be confusing for tests though,\n// And it can be bad for performance in production.\n// This feature flag can be used to control the behavior:\n\n // To preserve the \"Pause on caught exceptions\" behavior of the debugger, we\n// replay the begin phase of a failed component inside invokeGuardedCallback.\n\n // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:\n\n // Gather advanced timing metrics for Profiler subtrees.\n\n // Trace which interactions trigger each commit.\n\n // Only used in www builds.\n\n // TODO: true? Here it might just be false.\n\n // Only used in www builds.\n\n // Only used in www builds.\n\n // Disable javascript: URL strings in href for XSS protection.\n\n // React Fire: prevent the value and checked attributes from syncing\n// with their related DOM properties\n\n // These APIs will no longer be \"unstable\" in the upcoming 16.7 release,\n// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.\n\n\n // See https://github.com/react-native-community/discussions-and-proposals/issues/72 for more information\n// This is a flag so we can fix warnings in RN core before turning it on\n\n // Experimental React Flare event system and event components support.\n\nvar enableFlareAPI = false; // Experimental Host Component support.\n\nvar enableFundamentalAPI = false; // Experimental Scope support.\n\nvar enableScopeAPI = false; // New API for JSX transforms to target - https://github.com/reactjs/rfcs/pull/107\n\nvar enableJSXTransformAPI = false; // We will enforce mocking scheduler with scheduler/unstable_mock at some point. (v17?)\n// Till then, we warn about the missing mock, but still fallback to a sync mode compatible version\n\n // For tests, we flush suspense fallbacks in an act scope;\n// *except* in some of our own tests, where we test incremental loading states.\n\n // Changes priority of some events like mousemove to user-blocking priority,\n// but without making them discrete. The flag exists in case it causes\n// starvation problems.\n\n // Add a callback property to suspense to notify which promises are currently\n// in the update queue. This allows reporting and tracing of what is causing\n// the user to see a loading state.\n// Also allows hydration callbacks to fire when a dehydrated boundary gets\n// hydrated or deleted.\n\n // Part of the simplification of React.createElement so we can eventually move\n// from React.createElement to React.jsx\n// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md\n\nvar React = {\n  Children: {\n    map: mapChildren,\n    forEach: forEachChildren,\n    count: countChildren,\n    toArray: toArray,\n    only: onlyChild\n  },\n  createRef: createRef,\n  Component: Component,\n  PureComponent: PureComponent,\n  createContext: createContext,\n  forwardRef: forwardRef,\n  lazy: lazy,\n  memo: memo,\n  useCallback: useCallback,\n  useContext: useContext,\n  useEffect: useEffect,\n  useImperativeHandle: useImperativeHandle,\n  useDebugValue: useDebugValue,\n  useLayoutEffect: useLayoutEffect,\n  useMemo: useMemo,\n  useReducer: useReducer,\n  useRef: useRef,\n  useState: useState,\n  Fragment: REACT_FRAGMENT_TYPE,\n  Profiler: REACT_PROFILER_TYPE,\n  StrictMode: REACT_STRICT_MODE_TYPE,\n  Suspense: REACT_SUSPENSE_TYPE,\n  unstable_SuspenseList: REACT_SUSPENSE_LIST_TYPE,\n  createElement: createElementWithValidation,\n  cloneElement: cloneElementWithValidation,\n  createFactory: createFactoryWithValidation,\n  isValidElement: isValidElement,\n  version: ReactVersion,\n  unstable_withSuspenseConfig: withSuspenseConfig,\n  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals\n};\n\nif (enableFlareAPI) {\n  React.unstable_useResponder = useResponder;\n  React.unstable_createResponder = createEventResponder;\n}\n\nif (enableFundamentalAPI) {\n  React.unstable_createFundamental = createFundamentalComponent;\n}\n\nif (enableScopeAPI) {\n  React.unstable_createScope = createScope;\n} // Note: some APIs are added with feature flags.\n// Make sure that stable builds for open source\n// don't modify the React object to avoid deopts.\n// Also let's not expose their names in stable builds.\n\n\nif (enableJSXTransformAPI) {\n  {\n    React.jsxDEV = jsxWithValidation;\n    React.jsx = jsxWithValidationDynamic;\n    React.jsxs = jsxWithValidationStatic;\n  }\n}\n\n\n\nvar React$2 = Object.freeze({\n\tdefault: React\n});\n\nvar React$3 = ( React$2 && React ) || React$2;\n\n// TODO: decide on the top-level export form.\n// This is hacky but makes it work with both Rollup and Jest.\n\n\nvar react = React$3.default || React$3;\n\nmodule.exports = react;\n  })();\n}\n\n\n//# sourceURL=webpack:///./node_modules/react/cjs/react.development.js?");

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ \"./node_modules/react/cjs/react.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/react/index.js?");

/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v0.16.2\n * scheduler-tracing.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\n// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:\n\n // In some cases, StrictMode should also double-render lifecycles.\n// This can be confusing for tests though,\n// And it can be bad for performance in production.\n// This feature flag can be used to control the behavior:\n\n // To preserve the \"Pause on caught exceptions\" behavior of the debugger, we\n// replay the begin phase of a failed component inside invokeGuardedCallback.\n\n // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:\n\n // Gather advanced timing metrics for Profiler subtrees.\n\n // Trace which interactions trigger each commit.\n\nvar enableSchedulerTracing = true; // Only used in www builds.\n\n // TODO: true? Here it might just be false.\n\n // Only used in www builds.\n\n // Only used in www builds.\n\n // Disable javascript: URL strings in href for XSS protection.\n\n // React Fire: prevent the value and checked attributes from syncing\n// with their related DOM properties\n\n // These APIs will no longer be \"unstable\" in the upcoming 16.7 release,\n// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.\n\n\n // See https://github.com/react-native-community/discussions-and-proposals/issues/72 for more information\n// This is a flag so we can fix warnings in RN core before turning it on\n\n // Experimental React Flare event system and event components support.\n\n // Experimental Host Component support.\n\n // Experimental Scope support.\n\n // New API for JSX transforms to target - https://github.com/reactjs/rfcs/pull/107\n\n // We will enforce mocking scheduler with scheduler/unstable_mock at some point. (v17?)\n// Till then, we warn about the missing mock, but still fallback to a sync mode compatible version\n\n // For tests, we flush suspense fallbacks in an act scope;\n// *except* in some of our own tests, where we test incremental loading states.\n\n // Changes priority of some events like mousemove to user-blocking priority,\n// but without making them discrete. The flag exists in case it causes\n// starvation problems.\n\n // Add a callback property to suspense to notify which promises are currently\n// in the update queue. This allows reporting and tracing of what is causing\n// the user to see a loading state.\n// Also allows hydration callbacks to fire when a dehydrated boundary gets\n// hydrated or deleted.\n\n // Part of the simplification of React.createElement so we can eventually move\n// from React.createElement to React.jsx\n// https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md\n\nvar DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.\n\nvar interactionIDCounter = 0;\nvar threadIDCounter = 0; // Set of currently traced interactions.\n// Interactions \"stack\"–\n// Meaning that newly traced interactions are appended to the previously active set.\n// When an interaction goes out of scope, the previous set (if any) is restored.\n\nexports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.\n\nexports.__subscriberRef = null;\n\nif (enableSchedulerTracing) {\n  exports.__interactionsRef = {\n    current: new Set()\n  };\n  exports.__subscriberRef = {\n    current: null\n  };\n}\n\nfunction unstable_clear(callback) {\n  if (!enableSchedulerTracing) {\n    return callback();\n  }\n\n  var prevInteractions = exports.__interactionsRef.current;\n  exports.__interactionsRef.current = new Set();\n\n  try {\n    return callback();\n  } finally {\n    exports.__interactionsRef.current = prevInteractions;\n  }\n}\nfunction unstable_getCurrent() {\n  if (!enableSchedulerTracing) {\n    return null;\n  } else {\n    return exports.__interactionsRef.current;\n  }\n}\nfunction unstable_getThreadID() {\n  return ++threadIDCounter;\n}\nfunction unstable_trace(name, timestamp, callback) {\n  var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;\n\n  if (!enableSchedulerTracing) {\n    return callback();\n  }\n\n  var interaction = {\n    __count: 1,\n    id: interactionIDCounter++,\n    name: name,\n    timestamp: timestamp\n  };\n  var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.\n  // To do that, clone the current interactions.\n  // The previous set will be restored upon completion.\n\n  var interactions = new Set(prevInteractions);\n  interactions.add(interaction);\n  exports.__interactionsRef.current = interactions;\n  var subscriber = exports.__subscriberRef.current;\n  var returnValue;\n\n  try {\n    if (subscriber !== null) {\n      subscriber.onInteractionTraced(interaction);\n    }\n  } finally {\n    try {\n      if (subscriber !== null) {\n        subscriber.onWorkStarted(interactions, threadID);\n      }\n    } finally {\n      try {\n        returnValue = callback();\n      } finally {\n        exports.__interactionsRef.current = prevInteractions;\n\n        try {\n          if (subscriber !== null) {\n            subscriber.onWorkStopped(interactions, threadID);\n          }\n        } finally {\n          interaction.__count--; // If no async work was scheduled for this interaction,\n          // Notify subscribers that it's completed.\n\n          if (subscriber !== null && interaction.__count === 0) {\n            subscriber.onInteractionScheduledWorkCompleted(interaction);\n          }\n        }\n      }\n    }\n  }\n\n  return returnValue;\n}\nfunction unstable_wrap(callback) {\n  var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;\n\n  if (!enableSchedulerTracing) {\n    return callback;\n  }\n\n  var wrappedInteractions = exports.__interactionsRef.current;\n  var subscriber = exports.__subscriberRef.current;\n\n  if (subscriber !== null) {\n    subscriber.onWorkScheduled(wrappedInteractions, threadID);\n  } // Update the pending async work count for the current interactions.\n  // Update after calling subscribers in case of error.\n\n\n  wrappedInteractions.forEach(function (interaction) {\n    interaction.__count++;\n  });\n  var hasRun = false;\n\n  function wrapped() {\n    var prevInteractions = exports.__interactionsRef.current;\n    exports.__interactionsRef.current = wrappedInteractions;\n    subscriber = exports.__subscriberRef.current;\n\n    try {\n      var returnValue;\n\n      try {\n        if (subscriber !== null) {\n          subscriber.onWorkStarted(wrappedInteractions, threadID);\n        }\n      } finally {\n        try {\n          returnValue = callback.apply(undefined, arguments);\n        } finally {\n          exports.__interactionsRef.current = prevInteractions;\n\n          if (subscriber !== null) {\n            subscriber.onWorkStopped(wrappedInteractions, threadID);\n          }\n        }\n      }\n\n      return returnValue;\n    } finally {\n      if (!hasRun) {\n        // We only expect a wrapped function to be executed once,\n        // But in the event that it's executed more than once–\n        // Only decrement the outstanding interaction counts once.\n        hasRun = true; // Update pending async counts for all wrapped interactions.\n        // If this was the last scheduled async work for any of them,\n        // Mark them as completed.\n\n        wrappedInteractions.forEach(function (interaction) {\n          interaction.__count--;\n\n          if (subscriber !== null && interaction.__count === 0) {\n            subscriber.onInteractionScheduledWorkCompleted(interaction);\n          }\n        });\n      }\n    }\n  }\n\n  wrapped.cancel = function cancel() {\n    subscriber = exports.__subscriberRef.current;\n\n    try {\n      if (subscriber !== null) {\n        subscriber.onWorkCanceled(wrappedInteractions, threadID);\n      }\n    } finally {\n      // Update pending async counts for all wrapped interactions.\n      // If this was the last scheduled async work for any of them,\n      // Mark them as completed.\n      wrappedInteractions.forEach(function (interaction) {\n        interaction.__count--;\n\n        if (subscriber && interaction.__count === 0) {\n          subscriber.onInteractionScheduledWorkCompleted(interaction);\n        }\n      });\n    }\n  };\n\n  return wrapped;\n}\n\nvar subscribers = null;\n\nif (enableSchedulerTracing) {\n  subscribers = new Set();\n}\n\nfunction unstable_subscribe(subscriber) {\n  if (enableSchedulerTracing) {\n    subscribers.add(subscriber);\n\n    if (subscribers.size === 1) {\n      exports.__subscriberRef.current = {\n        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,\n        onInteractionTraced: onInteractionTraced,\n        onWorkCanceled: onWorkCanceled,\n        onWorkScheduled: onWorkScheduled,\n        onWorkStarted: onWorkStarted,\n        onWorkStopped: onWorkStopped\n      };\n    }\n  }\n}\nfunction unstable_unsubscribe(subscriber) {\n  if (enableSchedulerTracing) {\n    subscribers.delete(subscriber);\n\n    if (subscribers.size === 0) {\n      exports.__subscriberRef.current = null;\n    }\n  }\n}\n\nfunction onInteractionTraced(interaction) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onInteractionTraced(interaction);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onInteractionScheduledWorkCompleted(interaction) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onInteractionScheduledWorkCompleted(interaction);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkScheduled(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkScheduled(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkStarted(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkStarted(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkStopped(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkStopped(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nfunction onWorkCanceled(interactions, threadID) {\n  var didCatchError = false;\n  var caughtError = null;\n  subscribers.forEach(function (subscriber) {\n    try {\n      subscriber.onWorkCanceled(interactions, threadID);\n    } catch (error) {\n      if (!didCatchError) {\n        didCatchError = true;\n        caughtError = error;\n      }\n    }\n  });\n\n  if (didCatchError) {\n    throw caughtError;\n  }\n}\n\nexports.unstable_clear = unstable_clear;\nexports.unstable_getCurrent = unstable_getCurrent;\nexports.unstable_getThreadID = unstable_getThreadID;\nexports.unstable_trace = unstable_trace;\nexports.unstable_wrap = unstable_wrap;\nexports.unstable_subscribe = unstable_subscribe;\nexports.unstable_unsubscribe = unstable_unsubscribe;\n  })();\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/cjs/scheduler-tracing.development.js?");

/***/ }),

/***/ "./node_modules/scheduler/cjs/scheduler.development.js":
/*!*************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v0.16.2\n * scheduler.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\nvar enableSchedulerDebugging = false;\nvar enableIsInputPending = false;\nvar enableMessageLoopImplementation = true;\nvar enableProfiling = true;\n\n// works by scheduling a requestAnimationFrame, storing the time for the start\n// of the frame, then scheduling a postMessage which gets scheduled after paint.\n// Within the postMessage handler do as much work as possible until time + frame\n// rate. By separating the idle call into a separate event tick we ensure that\n// layout, paint and other browser work is counted against the available time.\n// The frame rate is dynamically adjusted.\n\nvar requestHostCallback;\n\nvar requestHostTimeout;\nvar cancelHostTimeout;\nvar shouldYieldToHost;\nvar requestPaint;\n\n\n\nif ( // If Scheduler runs in a non-DOM environment, it falls back to a naive\n// implementation using setTimeout.\ntypeof window === 'undefined' || // Check if MessageChannel is supported, too.\ntypeof MessageChannel !== 'function') {\n  // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,\n  // fallback to a naive implementation.\n  var _callback = null;\n  var _timeoutID = null;\n\n  var _flushCallback = function () {\n    if (_callback !== null) {\n      try {\n        var currentTime = exports.unstable_now();\n        var hasRemainingTime = true;\n\n        _callback(hasRemainingTime, currentTime);\n\n        _callback = null;\n      } catch (e) {\n        setTimeout(_flushCallback, 0);\n        throw e;\n      }\n    }\n  };\n\n  var initialTime = Date.now();\n\n  exports.unstable_now = function () {\n    return Date.now() - initialTime;\n  };\n\n  requestHostCallback = function (cb) {\n    if (_callback !== null) {\n      // Protect against re-entrancy.\n      setTimeout(requestHostCallback, 0, cb);\n    } else {\n      _callback = cb;\n      setTimeout(_flushCallback, 0);\n    }\n  };\n\n  requestHostTimeout = function (cb, ms) {\n    _timeoutID = setTimeout(cb, ms);\n  };\n\n  cancelHostTimeout = function () {\n    clearTimeout(_timeoutID);\n  };\n\n  shouldYieldToHost = function () {\n    return false;\n  };\n\n  requestPaint = exports.unstable_forceFrameRate = function () {};\n} else {\n  // Capture local references to native APIs, in case a polyfill overrides them.\n  var performance = window.performance;\n  var _Date = window.Date;\n  var _setTimeout = window.setTimeout;\n  var _clearTimeout = window.clearTimeout;\n  var requestAnimationFrame = window.requestAnimationFrame;\n  var cancelAnimationFrame = window.cancelAnimationFrame;\n\n  if (typeof console !== 'undefined') {\n    // TODO: Remove fb.me link\n    if (typeof requestAnimationFrame !== 'function') {\n      console.error(\"This browser doesn't support requestAnimationFrame. \" + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');\n    }\n\n    if (typeof cancelAnimationFrame !== 'function') {\n      console.error(\"This browser doesn't support cancelAnimationFrame. \" + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');\n    }\n  }\n\n  if (typeof performance === 'object' && typeof performance.now === 'function') {\n    exports.unstable_now = function () {\n      return performance.now();\n    };\n  } else {\n    var _initialTime = _Date.now();\n\n    exports.unstable_now = function () {\n      return _Date.now() - _initialTime;\n    };\n  }\n\n  var isRAFLoopRunning = false;\n  var isMessageLoopRunning = false;\n  var scheduledHostCallback = null;\n  var rAFTimeoutID = -1;\n  var taskTimeoutID = -1;\n  var frameLength = enableMessageLoopImplementation ? // We won't attempt to align with the vsync. Instead we'll yield multiple\n  // times per frame, often enough to keep it responsive even at really\n  // high frame rates > 120.\n  5 : // Use a heuristic to measure the frame rate and yield at the end of the\n  // frame. We start out assuming that we run at 30fps but then the\n  // heuristic tracking will adjust this value to a faster fps if we get\n  // more frequent animation frames.\n  33.33;\n  var prevRAFTime = -1;\n  var prevRAFInterval = -1;\n  var frameDeadline = 0;\n  var fpsLocked = false; // TODO: Make this configurable\n  // TODO: Adjust this based on priority?\n\n  var maxFrameLength = 300;\n  var needsPaint = false;\n\n  if (enableIsInputPending && navigator !== undefined && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined) {\n    var scheduling = navigator.scheduling;\n\n    shouldYieldToHost = function () {\n      var currentTime = exports.unstable_now();\n\n      if (currentTime >= frameDeadline) {\n        // There's no time left in the frame. We may want to yield control of\n        // the main thread, so the browser can perform high priority tasks. The\n        // main ones are painting and user input. If there's a pending paint or\n        // a pending input, then we should yield. But if there's neither, then\n        // we can yield less often while remaining responsive. We'll eventually\n        // yield regardless, since there could be a pending paint that wasn't\n        // accompanied by a call to `requestPaint`, or other main thread tasks\n        // like network events.\n        if (needsPaint || scheduling.isInputPending()) {\n          // There is either a pending paint or a pending input.\n          return true;\n        } // There's no pending input. Only yield if we've reached the max\n        // frame length.\n\n\n        return currentTime >= frameDeadline + maxFrameLength;\n      } else {\n        // There's still time left in the frame.\n        return false;\n      }\n    };\n\n    requestPaint = function () {\n      needsPaint = true;\n    };\n  } else {\n    // `isInputPending` is not available. Since we have no way of knowing if\n    // there's pending input, always yield at the end of the frame.\n    shouldYieldToHost = function () {\n      return exports.unstable_now() >= frameDeadline;\n    }; // Since we yield every frame regardless, `requestPaint` has no effect.\n\n\n    requestPaint = function () {};\n  }\n\n  exports.unstable_forceFrameRate = function (fps) {\n    if (fps < 0 || fps > 125) {\n      console.error('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing framerates higher than 125 fps is not unsupported');\n      return;\n    }\n\n    if (fps > 0) {\n      frameLength = Math.floor(1000 / fps);\n      fpsLocked = true;\n    } else {\n      // reset the framerate\n      frameLength = 33.33;\n      fpsLocked = false;\n    }\n  };\n\n  var performWorkUntilDeadline = function () {\n    if (enableMessageLoopImplementation) {\n      if (scheduledHostCallback !== null) {\n        var currentTime = exports.unstable_now(); // Yield after `frameLength` ms, regardless of where we are in the vsync\n        // cycle. This means there's always time remaining at the beginning of\n        // the message event.\n\n        frameDeadline = currentTime + frameLength;\n        var hasTimeRemaining = true;\n\n        try {\n          var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);\n\n          if (!hasMoreWork) {\n            isMessageLoopRunning = false;\n            scheduledHostCallback = null;\n          } else {\n            // If there's more work, schedule the next message event at the end\n            // of the preceding one.\n            port.postMessage(null);\n          }\n        } catch (error) {\n          // If a scheduler task throws, exit the current browser task so the\n          // error can be observed.\n          port.postMessage(null);\n          throw error;\n        }\n      } else {\n        isMessageLoopRunning = false;\n      } // Yielding to the browser will give it a chance to paint, so we can\n      // reset this.\n\n\n      needsPaint = false;\n    } else {\n      if (scheduledHostCallback !== null) {\n        var _currentTime = exports.unstable_now();\n\n        var _hasTimeRemaining = frameDeadline - _currentTime > 0;\n\n        try {\n          var _hasMoreWork = scheduledHostCallback(_hasTimeRemaining, _currentTime);\n\n          if (!_hasMoreWork) {\n            scheduledHostCallback = null;\n          }\n        } catch (error) {\n          // If a scheduler task throws, exit the current browser task so the\n          // error can be observed, and post a new task as soon as possible\n          // so we can continue where we left off.\n          port.postMessage(null);\n          throw error;\n        }\n      } // Yielding to the browser will give it a chance to paint, so we can\n      // reset this.\n\n\n      needsPaint = false;\n    }\n  };\n\n  var channel = new MessageChannel();\n  var port = channel.port2;\n  channel.port1.onmessage = performWorkUntilDeadline;\n\n  var onAnimationFrame = function (rAFTime) {\n    if (scheduledHostCallback === null) {\n      // No scheduled work. Exit.\n      prevRAFTime = -1;\n      prevRAFInterval = -1;\n      isRAFLoopRunning = false;\n      return;\n    } // Eagerly schedule the next animation callback at the beginning of the\n    // frame. If the scheduler queue is not empty at the end of the frame, it\n    // will continue flushing inside that callback. If the queue *is* empty,\n    // then it will exit immediately. Posting the callback at the start of the\n    // frame ensures it's fired within the earliest possible frame. If we\n    // waited until the end of the frame to post the callback, we risk the\n    // browser skipping a frame and not firing the callback until the frame\n    // after that.\n\n\n    isRAFLoopRunning = true;\n    requestAnimationFrame(function (nextRAFTime) {\n      _clearTimeout(rAFTimeoutID);\n\n      onAnimationFrame(nextRAFTime);\n    }); // requestAnimationFrame is throttled when the tab is backgrounded. We\n    // don't want to stop working entirely. So we'll fallback to a timeout loop.\n    // TODO: Need a better heuristic for backgrounded work.\n\n    var onTimeout = function () {\n      frameDeadline = exports.unstable_now() + frameLength / 2;\n      performWorkUntilDeadline();\n      rAFTimeoutID = _setTimeout(onTimeout, frameLength * 3);\n    };\n\n    rAFTimeoutID = _setTimeout(onTimeout, frameLength * 3);\n\n    if (prevRAFTime !== -1 && // Make sure this rAF time is different from the previous one. This check\n    // could fail if two rAFs fire in the same frame.\n    rAFTime - prevRAFTime > 0.1) {\n      var rAFInterval = rAFTime - prevRAFTime;\n\n      if (!fpsLocked && prevRAFInterval !== -1) {\n        // We've observed two consecutive frame intervals. We'll use this to\n        // dynamically adjust the frame rate.\n        //\n        // If one frame goes long, then the next one can be short to catch up.\n        // If two frames are short in a row, then that's an indication that we\n        // actually have a higher frame rate than what we're currently\n        // optimizing. For example, if we're running on 120hz display or 90hz VR\n        // display. Take the max of the two in case one of them was an anomaly\n        // due to missed frame deadlines.\n        if (rAFInterval < frameLength && prevRAFInterval < frameLength) {\n          frameLength = rAFInterval < prevRAFInterval ? prevRAFInterval : rAFInterval;\n\n          if (frameLength < 8.33) {\n            // Defensive coding. We don't support higher frame rates than 120hz.\n            // If the calculated frame length gets lower than 8, it is probably\n            // a bug.\n            frameLength = 8.33;\n          }\n        }\n      }\n\n      prevRAFInterval = rAFInterval;\n    }\n\n    prevRAFTime = rAFTime;\n    frameDeadline = rAFTime + frameLength; // We use the postMessage trick to defer idle work until after the repaint.\n\n    port.postMessage(null);\n  };\n\n  requestHostCallback = function (callback) {\n    scheduledHostCallback = callback;\n\n    if (enableMessageLoopImplementation) {\n      if (!isMessageLoopRunning) {\n        isMessageLoopRunning = true;\n        port.postMessage(null);\n      }\n    } else {\n      if (!isRAFLoopRunning) {\n        // Start a rAF loop.\n        isRAFLoopRunning = true;\n        requestAnimationFrame(function (rAFTime) {\n          onAnimationFrame(rAFTime);\n        });\n      }\n    }\n  };\n\n  requestHostTimeout = function (callback, ms) {\n    taskTimeoutID = _setTimeout(function () {\n      callback(exports.unstable_now());\n    }, ms);\n  };\n\n  cancelHostTimeout = function () {\n    _clearTimeout(taskTimeoutID);\n\n    taskTimeoutID = -1;\n  };\n}\n\nfunction push(heap, node) {\n  var index = heap.length;\n  heap.push(node);\n  siftUp(heap, node, index);\n}\nfunction peek(heap) {\n  var first = heap[0];\n  return first === undefined ? null : first;\n}\nfunction pop(heap) {\n  var first = heap[0];\n\n  if (first !== undefined) {\n    var last = heap.pop();\n\n    if (last !== first) {\n      heap[0] = last;\n      siftDown(heap, last, 0);\n    }\n\n    return first;\n  } else {\n    return null;\n  }\n}\n\nfunction siftUp(heap, node, i) {\n  var index = i;\n\n  while (true) {\n    var parentIndex = Math.floor((index - 1) / 2);\n    var parent = heap[parentIndex];\n\n    if (parent !== undefined && compare(parent, node) > 0) {\n      // The parent is larger. Swap positions.\n      heap[parentIndex] = node;\n      heap[index] = parent;\n      index = parentIndex;\n    } else {\n      // The parent is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction siftDown(heap, node, i) {\n  var index = i;\n  var length = heap.length;\n\n  while (index < length) {\n    var leftIndex = (index + 1) * 2 - 1;\n    var left = heap[leftIndex];\n    var rightIndex = leftIndex + 1;\n    var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.\n\n    if (left !== undefined && compare(left, node) < 0) {\n      if (right !== undefined && compare(right, left) < 0) {\n        heap[index] = right;\n        heap[rightIndex] = node;\n        index = rightIndex;\n      } else {\n        heap[index] = left;\n        heap[leftIndex] = node;\n        index = leftIndex;\n      }\n    } else if (right !== undefined && compare(right, node) < 0) {\n      heap[index] = right;\n      heap[rightIndex] = node;\n      index = rightIndex;\n    } else {\n      // Neither child is smaller. Exit.\n      return;\n    }\n  }\n}\n\nfunction compare(a, b) {\n  // Compare sort index first, then task id.\n  var diff = a.sortIndex - b.sortIndex;\n  return diff !== 0 ? diff : a.id - b.id;\n}\n\n// TODO: Use symbols?\nvar NoPriority = 0;\nvar ImmediatePriority = 1;\nvar UserBlockingPriority = 2;\nvar NormalPriority = 3;\nvar LowPriority = 4;\nvar IdlePriority = 5;\n\nvar runIdCounter = 0;\nvar mainThreadIdCounter = 0;\nvar profilingStateSize = 4;\nvar sharedProfilingBuffer = enableProfiling ? // $FlowFixMe Flow doesn't know about SharedArrayBuffer\ntypeof SharedArrayBuffer === 'function' ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : // $FlowFixMe Flow doesn't know about ArrayBuffer\ntypeof ArrayBuffer === 'function' ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null // Don't crash the init path on IE9\n: null;\nvar profilingState = enableProfiling && sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : []; // We can't read this but it helps save bytes for null checks\n\nvar PRIORITY = 0;\nvar CURRENT_TASK_ID = 1;\nvar CURRENT_RUN_ID = 2;\nvar QUEUE_SIZE = 3;\n\nif (enableProfiling) {\n  profilingState[PRIORITY] = NoPriority; // This is maintained with a counter, because the size of the priority queue\n  // array might include canceled tasks.\n\n  profilingState[QUEUE_SIZE] = 0;\n  profilingState[CURRENT_TASK_ID] = 0;\n} // Bytes per element is 4\n\n\nvar INITIAL_EVENT_LOG_SIZE = 131072;\nvar MAX_EVENT_LOG_SIZE = 524288; // Equivalent to 2 megabytes\n\nvar eventLogSize = 0;\nvar eventLogBuffer = null;\nvar eventLog = null;\nvar eventLogIndex = 0;\nvar TaskStartEvent = 1;\nvar TaskCompleteEvent = 2;\nvar TaskErrorEvent = 3;\nvar TaskCancelEvent = 4;\nvar TaskRunEvent = 5;\nvar TaskYieldEvent = 6;\nvar SchedulerSuspendEvent = 7;\nvar SchedulerResumeEvent = 8;\n\nfunction logEvent(entries) {\n  if (eventLog !== null) {\n    var offset = eventLogIndex;\n    eventLogIndex += entries.length;\n\n    if (eventLogIndex + 1 > eventLogSize) {\n      eventLogSize *= 2;\n\n      if (eventLogSize > MAX_EVENT_LOG_SIZE) {\n        console.error(\"Scheduler Profiling: Event log exceeded maximum size. Don't \" + 'forget to call `stopLoggingProfilingEvents()`.');\n        stopLoggingProfilingEvents();\n        return;\n      }\n\n      var newEventLog = new Int32Array(eventLogSize * 4);\n      newEventLog.set(eventLog);\n      eventLogBuffer = newEventLog.buffer;\n      eventLog = newEventLog;\n    }\n\n    eventLog.set(entries, offset);\n  }\n}\n\nfunction startLoggingProfilingEvents() {\n  eventLogSize = INITIAL_EVENT_LOG_SIZE;\n  eventLogBuffer = new ArrayBuffer(eventLogSize * 4);\n  eventLog = new Int32Array(eventLogBuffer);\n  eventLogIndex = 0;\n}\nfunction stopLoggingProfilingEvents() {\n  var buffer = eventLogBuffer;\n  eventLogSize = 0;\n  eventLogBuffer = null;\n  eventLog = null;\n  eventLogIndex = 0;\n  return buffer;\n}\nfunction markTaskStart(task, time) {\n  if (enableProfiling) {\n    profilingState[QUEUE_SIZE]++;\n\n    if (eventLog !== null) {\n      logEvent([TaskStartEvent, time, task.id, task.priorityLevel]);\n    }\n  }\n}\nfunction markTaskCompleted(task, time) {\n  if (enableProfiling) {\n    profilingState[PRIORITY] = NoPriority;\n    profilingState[CURRENT_TASK_ID] = 0;\n    profilingState[QUEUE_SIZE]--;\n\n    if (eventLog !== null) {\n      logEvent([TaskCompleteEvent, time, task.id]);\n    }\n  }\n}\nfunction markTaskCanceled(task, time) {\n  if (enableProfiling) {\n    profilingState[QUEUE_SIZE]--;\n\n    if (eventLog !== null) {\n      logEvent([TaskCancelEvent, time, task.id]);\n    }\n  }\n}\nfunction markTaskErrored(task, time) {\n  if (enableProfiling) {\n    profilingState[PRIORITY] = NoPriority;\n    profilingState[CURRENT_TASK_ID] = 0;\n    profilingState[QUEUE_SIZE]--;\n\n    if (eventLog !== null) {\n      logEvent([TaskErrorEvent, time, task.id]);\n    }\n  }\n}\nfunction markTaskRun(task, time) {\n  if (enableProfiling) {\n    runIdCounter++;\n    profilingState[PRIORITY] = task.priorityLevel;\n    profilingState[CURRENT_TASK_ID] = task.id;\n    profilingState[CURRENT_RUN_ID] = runIdCounter;\n\n    if (eventLog !== null) {\n      logEvent([TaskRunEvent, time, task.id, runIdCounter]);\n    }\n  }\n}\nfunction markTaskYield(task, time) {\n  if (enableProfiling) {\n    profilingState[PRIORITY] = NoPriority;\n    profilingState[CURRENT_TASK_ID] = 0;\n    profilingState[CURRENT_RUN_ID] = 0;\n\n    if (eventLog !== null) {\n      logEvent([TaskYieldEvent, time, task.id, runIdCounter]);\n    }\n  }\n}\nfunction markSchedulerSuspended(time) {\n  if (enableProfiling) {\n    mainThreadIdCounter++;\n\n    if (eventLog !== null) {\n      logEvent([SchedulerSuspendEvent, time, mainThreadIdCounter]);\n    }\n  }\n}\nfunction markSchedulerUnsuspended(time) {\n  if (enableProfiling) {\n    if (eventLog !== null) {\n      logEvent([SchedulerResumeEvent, time, mainThreadIdCounter]);\n    }\n  }\n}\n\n/* eslint-disable no-var */\n// Math.pow(2, 30) - 1\n// 0b111111111111111111111111111111\n\nvar maxSigned31BitInt = 1073741823; // Times out immediately\n\nvar IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out\n\nvar USER_BLOCKING_PRIORITY = 250;\nvar NORMAL_PRIORITY_TIMEOUT = 5000;\nvar LOW_PRIORITY_TIMEOUT = 10000; // Never times out\n\nvar IDLE_PRIORITY = maxSigned31BitInt; // Tasks are stored on a min heap\n\nvar taskQueue = [];\nvar timerQueue = []; // Incrementing id counter. Used to maintain insertion order.\n\nvar taskIdCounter = 1; // Pausing the scheduler is useful for debugging.\n\nvar isSchedulerPaused = false;\nvar currentTask = null;\nvar currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.\n\nvar isPerformingWork = false;\nvar isHostCallbackScheduled = false;\nvar isHostTimeoutScheduled = false;\n\nfunction advanceTimers(currentTime) {\n  // Check for tasks that are no longer delayed and add them to the queue.\n  var timer = peek(timerQueue);\n\n  while (timer !== null) {\n    if (timer.callback === null) {\n      // Timer was cancelled.\n      pop(timerQueue);\n    } else if (timer.startTime <= currentTime) {\n      // Timer fired. Transfer to the task queue.\n      pop(timerQueue);\n      timer.sortIndex = timer.expirationTime;\n      push(taskQueue, timer);\n\n      if (enableProfiling) {\n        markTaskStart(timer, currentTime);\n        timer.isQueued = true;\n      }\n    } else {\n      // Remaining timers are pending.\n      return;\n    }\n\n    timer = peek(timerQueue);\n  }\n}\n\nfunction handleTimeout(currentTime) {\n  isHostTimeoutScheduled = false;\n  advanceTimers(currentTime);\n\n  if (!isHostCallbackScheduled) {\n    if (peek(taskQueue) !== null) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    } else {\n      var firstTimer = peek(timerQueue);\n\n      if (firstTimer !== null) {\n        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n      }\n    }\n  }\n}\n\nfunction flushWork(hasTimeRemaining, initialTime) {\n  if (enableProfiling) {\n    markSchedulerUnsuspended(initialTime);\n  } // We'll need a host callback the next time work is scheduled.\n\n\n  isHostCallbackScheduled = false;\n\n  if (isHostTimeoutScheduled) {\n    // We scheduled a timeout but it's no longer needed. Cancel it.\n    isHostTimeoutScheduled = false;\n    cancelHostTimeout();\n  }\n\n  isPerformingWork = true;\n  var previousPriorityLevel = currentPriorityLevel;\n\n  try {\n    if (enableProfiling) {\n      try {\n        return workLoop(hasTimeRemaining, initialTime);\n      } catch (error) {\n        if (currentTask !== null) {\n          var currentTime = exports.unstable_now();\n          markTaskErrored(currentTask, currentTime);\n          currentTask.isQueued = false;\n        }\n\n        throw error;\n      }\n    } else {\n      // No catch in prod codepath.\n      return workLoop(hasTimeRemaining, initialTime);\n    }\n  } finally {\n    currentTask = null;\n    currentPriorityLevel = previousPriorityLevel;\n    isPerformingWork = false;\n\n    if (enableProfiling) {\n      var _currentTime = exports.unstable_now();\n\n      markSchedulerSuspended(_currentTime);\n    }\n  }\n}\n\nfunction workLoop(hasTimeRemaining, initialTime) {\n  var currentTime = initialTime;\n  advanceTimers(currentTime);\n  currentTask = peek(taskQueue);\n\n  while (currentTask !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {\n    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {\n      // This currentTask hasn't expired, and we've reached the deadline.\n      break;\n    }\n\n    var callback = currentTask.callback;\n\n    if (callback !== null) {\n      currentTask.callback = null;\n      currentPriorityLevel = currentTask.priorityLevel;\n      var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;\n      markTaskRun(currentTask, currentTime);\n      var continuationCallback = callback(didUserCallbackTimeout);\n      currentTime = exports.unstable_now();\n\n      if (typeof continuationCallback === 'function') {\n        currentTask.callback = continuationCallback;\n        markTaskYield(currentTask, currentTime);\n      } else {\n        if (enableProfiling) {\n          markTaskCompleted(currentTask, currentTime);\n          currentTask.isQueued = false;\n        }\n\n        if (currentTask === peek(taskQueue)) {\n          pop(taskQueue);\n        }\n      }\n\n      advanceTimers(currentTime);\n    } else {\n      pop(taskQueue);\n    }\n\n    currentTask = peek(taskQueue);\n  } // Return whether there's additional work\n\n\n  if (currentTask !== null) {\n    return true;\n  } else {\n    var firstTimer = peek(timerQueue);\n\n    if (firstTimer !== null) {\n      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);\n    }\n\n    return false;\n  }\n}\n\nfunction unstable_runWithPriority(priorityLevel, eventHandler) {\n  switch (priorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n    case LowPriority:\n    case IdlePriority:\n      break;\n\n    default:\n      priorityLevel = NormalPriority;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_next(eventHandler) {\n  var priorityLevel;\n\n  switch (currentPriorityLevel) {\n    case ImmediatePriority:\n    case UserBlockingPriority:\n    case NormalPriority:\n      // Shift down to normal priority\n      priorityLevel = NormalPriority;\n      break;\n\n    default:\n      // Anything lower than normal priority should remain at the current level.\n      priorityLevel = currentPriorityLevel;\n      break;\n  }\n\n  var previousPriorityLevel = currentPriorityLevel;\n  currentPriorityLevel = priorityLevel;\n\n  try {\n    return eventHandler();\n  } finally {\n    currentPriorityLevel = previousPriorityLevel;\n  }\n}\n\nfunction unstable_wrapCallback(callback) {\n  var parentPriorityLevel = currentPriorityLevel;\n  return function () {\n    // This is a fork of runWithPriority, inlined for performance.\n    var previousPriorityLevel = currentPriorityLevel;\n    currentPriorityLevel = parentPriorityLevel;\n\n    try {\n      return callback.apply(this, arguments);\n    } finally {\n      currentPriorityLevel = previousPriorityLevel;\n    }\n  };\n}\n\nfunction timeoutForPriorityLevel(priorityLevel) {\n  switch (priorityLevel) {\n    case ImmediatePriority:\n      return IMMEDIATE_PRIORITY_TIMEOUT;\n\n    case UserBlockingPriority:\n      return USER_BLOCKING_PRIORITY;\n\n    case IdlePriority:\n      return IDLE_PRIORITY;\n\n    case LowPriority:\n      return LOW_PRIORITY_TIMEOUT;\n\n    case NormalPriority:\n    default:\n      return NORMAL_PRIORITY_TIMEOUT;\n  }\n}\n\nfunction unstable_scheduleCallback(priorityLevel, callback, options) {\n  var currentTime = exports.unstable_now();\n  var startTime;\n  var timeout;\n\n  if (typeof options === 'object' && options !== null) {\n    var delay = options.delay;\n\n    if (typeof delay === 'number' && delay > 0) {\n      startTime = currentTime + delay;\n    } else {\n      startTime = currentTime;\n    }\n\n    timeout = typeof options.timeout === 'number' ? options.timeout : timeoutForPriorityLevel(priorityLevel);\n  } else {\n    timeout = timeoutForPriorityLevel(priorityLevel);\n    startTime = currentTime;\n  }\n\n  var expirationTime = startTime + timeout;\n  var newTask = {\n    id: taskIdCounter++,\n    callback: callback,\n    priorityLevel: priorityLevel,\n    startTime: startTime,\n    expirationTime: expirationTime,\n    sortIndex: -1\n  };\n\n  if (enableProfiling) {\n    newTask.isQueued = false;\n  }\n\n  if (startTime > currentTime) {\n    // This is a delayed task.\n    newTask.sortIndex = startTime;\n    push(timerQueue, newTask);\n\n    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {\n      // All tasks are delayed, and this is the task with the earliest delay.\n      if (isHostTimeoutScheduled) {\n        // Cancel an existing timeout.\n        cancelHostTimeout();\n      } else {\n        isHostTimeoutScheduled = true;\n      } // Schedule a timeout.\n\n\n      requestHostTimeout(handleTimeout, startTime - currentTime);\n    }\n  } else {\n    newTask.sortIndex = expirationTime;\n    push(taskQueue, newTask);\n\n    if (enableProfiling) {\n      markTaskStart(newTask, currentTime);\n      newTask.isQueued = true;\n    } // Schedule a host callback, if needed. If we're already performing work,\n    // wait until the next time we yield.\n\n\n    if (!isHostCallbackScheduled && !isPerformingWork) {\n      isHostCallbackScheduled = true;\n      requestHostCallback(flushWork);\n    }\n  }\n\n  return newTask;\n}\n\nfunction unstable_pauseExecution() {\n  isSchedulerPaused = true;\n}\n\nfunction unstable_continueExecution() {\n  isSchedulerPaused = false;\n\n  if (!isHostCallbackScheduled && !isPerformingWork) {\n    isHostCallbackScheduled = true;\n    requestHostCallback(flushWork);\n  }\n}\n\nfunction unstable_getFirstCallbackNode() {\n  return peek(taskQueue);\n}\n\nfunction unstable_cancelCallback(task) {\n  if (enableProfiling) {\n    if (task.isQueued) {\n      var currentTime = exports.unstable_now();\n      markTaskCanceled(task, currentTime);\n      task.isQueued = false;\n    }\n  } // Null out the callback to indicate the task has been canceled. (Can't\n  // remove from the queue because you can't remove arbitrary nodes from an\n  // array based heap, only the first one.)\n\n\n  task.callback = null;\n}\n\nfunction unstable_getCurrentPriorityLevel() {\n  return currentPriorityLevel;\n}\n\nfunction unstable_shouldYield() {\n  var currentTime = exports.unstable_now();\n  advanceTimers(currentTime);\n  var firstTask = peek(taskQueue);\n  return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();\n}\n\nvar unstable_requestPaint = requestPaint;\nvar unstable_Profiling = enableProfiling ? {\n  startLoggingProfilingEvents: startLoggingProfilingEvents,\n  stopLoggingProfilingEvents: stopLoggingProfilingEvents,\n  sharedProfilingBuffer: sharedProfilingBuffer\n} : null;\n\nexports.unstable_ImmediatePriority = ImmediatePriority;\nexports.unstable_UserBlockingPriority = UserBlockingPriority;\nexports.unstable_NormalPriority = NormalPriority;\nexports.unstable_IdlePriority = IdlePriority;\nexports.unstable_LowPriority = LowPriority;\nexports.unstable_runWithPriority = unstable_runWithPriority;\nexports.unstable_next = unstable_next;\nexports.unstable_scheduleCallback = unstable_scheduleCallback;\nexports.unstable_cancelCallback = unstable_cancelCallback;\nexports.unstable_wrapCallback = unstable_wrapCallback;\nexports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;\nexports.unstable_shouldYield = unstable_shouldYield;\nexports.unstable_requestPaint = unstable_requestPaint;\nexports.unstable_continueExecution = unstable_continueExecution;\nexports.unstable_pauseExecution = unstable_pauseExecution;\nexports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;\nexports.unstable_Profiling = unstable_Profiling;\n  })();\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/cjs/scheduler.development.js?");

/***/ }),

/***/ "./node_modules/scheduler/index.js":
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ \"./node_modules/scheduler/cjs/scheduler.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/index.js?");

/***/ }),

/***/ "./node_modules/scheduler/tracing.js":
/*!*******************************************!*\
  !*** ./node_modules/scheduler/tracing.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler-tracing.development.js */ \"./node_modules/scheduler/cjs/scheduler-tracing.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/scheduler/tracing.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar stylesInDom = {};\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nfunction listToStyles(list, options) {\n  var styles = [];\n  var newStyles = {};\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var css = item[1];\n    var media = item[2];\n    var sourceMap = item[3];\n    var part = {\n      css: css,\n      media: media,\n      sourceMap: sourceMap\n    };\n\n    if (!newStyles[id]) {\n      styles.push(newStyles[id] = {\n        id: id,\n        parts: [part]\n      });\n    } else {\n      newStyles[id].parts.push(part);\n    }\n  }\n\n  return styles;\n}\n\nfunction addStylesToDom(styles, options) {\n  for (var i = 0; i < styles.length; i++) {\n    var item = styles[i];\n    var domStyle = stylesInDom[item.id];\n    var j = 0;\n\n    if (domStyle) {\n      domStyle.refs++;\n\n      for (; j < domStyle.parts.length; j++) {\n        domStyle.parts[j](item.parts[j]);\n      }\n\n      for (; j < item.parts.length; j++) {\n        domStyle.parts.push(addStyle(item.parts[j], options));\n      }\n    } else {\n      var parts = [];\n\n      for (; j < item.parts.length; j++) {\n        parts.push(addStyle(item.parts[j], options));\n      }\n\n      stylesInDom[item.id] = {\n        id: item.id,\n        refs: 1,\n        parts: parts\n      };\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n\n  if (typeof options.attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      options.attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(options.attributes).forEach(function (key) {\n    style.setAttribute(key, options.attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  var styles = listToStyles(list, options);\n  addStylesToDom(styles, options);\n  return function update(newList) {\n    var mayRemove = [];\n\n    for (var i = 0; i < styles.length; i++) {\n      var item = styles[i];\n      var domStyle = stylesInDom[item.id];\n\n      if (domStyle) {\n        domStyle.refs--;\n        mayRemove.push(domStyle);\n      }\n    }\n\n    if (newList) {\n      var newStyles = listToStyles(newList, options);\n      addStylesToDom(newStyles, options);\n    }\n\n    for (var _i = 0; _i < mayRemove.length; _i++) {\n      var _domStyle = mayRemove[_i];\n\n      if (_domStyle.refs === 0) {\n        for (var j = 0; j < _domStyle.parts.length; j++) {\n          _domStyle.parts[j]();\n        }\n\n        delete stylesInDom[_domStyle.id];\n      }\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/Controls.tsx":
/*!**************************!*\
  !*** ./src/Controls.tsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Marker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Marker */ \"./src/Marker.tsx\");\n\n\n\nfunction Controls(props) {\n  var progressEl = props.progressEl,\n      volumeEl = props.volumeEl,\n      controls = props.controls,\n      isPlaying = props.isPlaying,\n      volume = props.volume,\n      muted = props.muted,\n      currentTime = props.currentTime,\n      duration = props.duration,\n      markers = props.markers,\n      onPlayClick = props.onPlayClick,\n      onPauseClick = props.onPauseClick,\n      onProgressClick = props.onProgressClick,\n      onVolumeClick = props.onVolumeClick,\n      onMuteClick = props.onMuteClick,\n      onFullScreenClick = props.onFullScreenClick,\n      onMarkerClick = props.onMarkerClick;\n\n  var getTimeCode = function getTimeCode(secs) {\n    var secondsNumber = secs ? parseInt(String(secs), 10) : 0;\n    var hours = Math.floor(secondsNumber / 3600);\n    var minutes = Math.floor((secondsNumber - hours * 3600) / 60);\n    var seconds = secondsNumber - hours * 3600 - minutes * 60;\n    var hoursStr = String(hours);\n    var minutesStr = String(minutes);\n    var secondsStr = String(seconds);\n\n    if (hours < 10) {\n      hoursStr = '0' + hours;\n    }\n\n    if (minutes < 10) {\n      minutesStr = '0' + minutes;\n    }\n\n    if (seconds < 10) {\n      secondsStr = '0' + seconds;\n    }\n\n    return \"\".concat(hoursStr !== '00' ? hoursStr + ':' : '').concat(minutesStr, \":\").concat(secondsStr);\n  };\n\n  var durationTimeCode = getTimeCode(Math.ceil(duration));\n  var currentTimeCode = currentTime !== duration ? getTimeCode(currentTime) : durationTimeCode;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"react-video-controls\"\n  }, controls.includes('play') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: isPlaying ? 'pause' : 'play',\n    onClick: isPlaying ? onPauseClick : onPlayClick\n  }, isPlaying ? 'Pause' : 'Play') : null, controls.includes('time') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"time\"\n  }, currentTimeCode, \"/\", durationTimeCode) : null, controls.includes('progress') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"progress-wrap\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"progress\", {\n    ref: progressEl,\n    max: \"100\",\n    onClick: onProgressClick\n  }, \"0% played\"), markers && markers.map(function (marker, index) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Marker__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      key: index,\n      marker: marker,\n      duration: duration,\n      onMarkerClick: onMarkerClick\n    });\n  })) : null, controls.includes('volume') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"volume-wrap\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"progress\", {\n    ref: volumeEl,\n    max: \"100\",\n    value: volume * 100,\n    onClick: onVolumeClick\n  }, volume * 100, \"% volume\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: muted ? 'no-volume' : 'volume',\n    onClick: onMuteClick\n  }, \"Volume\")) : null, controls.includes('full-screen') ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: \"full-screen\",\n    onClick: onFullScreenClick\n  }, \"FullScreen\") : null);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Controls);\n void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/home/arthur/www/react-video-markers/src/Controls.tsx\"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, \"/home/arthur/www/react-video-markers/src/Controls.tsx\"); } }(); \n\n//# sourceURL=webpack:///./src/Controls.tsx?");

/***/ }),

/***/ "./src/Marker.tsx":
/*!************************!*\
  !*** ./src/Marker.tsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Marker(props) {\n  var marker = props.marker,\n      duration = props.duration,\n      onMarkerClick = props.onMarkerClick;\n  var time = marker.time,\n      color = marker.color,\n      title = marker.title;\n  var id = String(marker.id);\n\n  var getPosition = function getPosition() {\n    if (duration) {\n      var percent = time <= duration ? time / duration : 1;\n      return \"calc(\".concat(percent * 100, \"% - 2px)\");\n    }\n\n    return '-9999px';\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    id: id,\n    className: \"react-video-marker\",\n    title: title,\n    style: {\n      background: color,\n      left: getPosition()\n    },\n    onClick: function onClick() {\n      onMarkerClick(marker);\n    }\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Marker);\n void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/home/arthur/www/react-video-markers/src/Marker.tsx\"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, \"/home/arthur/www/react-video-markers/src/Marker.tsx\"); } }(); \n\n//# sourceURL=webpack:///./src/Marker.tsx?");

/***/ }),

/***/ "./src/images/close-video.svg":
/*!************************************!*\
  !*** ./src/images/close-video.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMjMiIHZpZXdCb3g9IjAgMCAyMyAyMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS41MDAyIDAuNzAwMTk1QzUuNTMwNzcgMC43MDAxOTUgMC43MDAxOTUgNS41Mjg2MSAwLjcwMDE5NSAxMS41MDAyQzAuNzAwMTk1IDE3LjQ2OTYgNS41MzA3NyAyMi4zMDAyIDExLjUwMDIgMjIuMzAwMkMxNy40NzE4IDIyLjMwMDIgMjIuMzAwMiAxNy40Njk2IDIyLjMwMDIgMTEuNTAwMkMyMi4zMDAyIDUuNTI3NTMgMTcuNDcyOSAwLjcwMDE5NSAxMS41MDAyIDAuNzAwMTk1Wk03LjM4MjcgNi45MTAyQzcuNDAyNzQgNi45MDkxNCA3LjQyMTcyIDYuOTA5MTQgNy40NDE3NiA2LjkxMDJDNy41ODczMSA2LjkwOTE0IDcuNzI3NTggNi45NjYwOSA3LjgyOTg4IDcuMDcwNTFMMTEuNTAwMyAxMC43MzIyTDE1LjE2MiA3LjA3MDUxQzE1LjI2MDEgNi45NzAzMSAxNS4zOTMgNi45MTMzNiAxNS41MzMzIDYuOTEwMkMxNS43NTY4IDYuOTAwNyAxNS45NjM2IDcuMDMxNDkgMTYuMDUxMSA3LjIzNzE0QzE2LjEzOTcgNy40NDM4NiAxNi4wOTEyIDcuNjgyMjEgMTUuOTI5OCA3LjgzODMyTDEyLjI1OTQgMTEuNTA4N0wxNS45Mjk4IDE1LjE3MDRDMTYuMDMyMSAxNS4yNzE3IDE2LjA4OTEgMTUuNDA5OSAxNi4wODkxIDE1LjU1NDRDMTYuMDg5MSAxNS42OTc4IDE2LjAzMjEgMTUuODM2IDE1LjkyOTggMTUuOTM4M0MxNS44Mjg2IDE2LjAzOTUgMTUuNjkwNCAxNi4wOTc1IDE1LjU0NTkgMTYuMDk3NUMxNS40MDE0IDE2LjA5NzUgMTUuMjY0MyAxNi4wMzk1IDE1LjE2MiAxNS45MzgzTDExLjUwMDMgMTIuMjY3OUw3LjgyOTg4IDE1LjkzODNDNy42MTc4OSAxNi4xNTAzIDcuMjc0MDYgMTYuMTUwMyA3LjA2MjA1IDE1LjkzODNDNi44NTAwNSAxNS43MjYzIDYuODUwMDYgMTUuMzgyNCA3LjA2MjA1IDE1LjE3MDRMMTAuNzIzOCAxMS41MDg3TDcuMDYyMDUgNy44MzgzMkM2LjkwOTEyIDcuNjkxNzIgNi44NTUzMyA3LjQ3MDIzIDYuOTI0OTQgNy4yNzA4OUM2Ljk5MzUgNy4wNzE1NSA3LjE3MjggNi45MzAyMyA3LjM4MjY3IDYuOTEwMkg3LjM4MjdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K\"\n\n//# sourceURL=webpack:///./src/images/close-video.svg?");

/***/ }),

/***/ "./src/images/full-screen-black.svg":
/*!******************************************!*\
  !*** ./src/images/full-screen-black.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjIyNyA4LjIzMDJDMTguMTk1MyA4LjIxNjkzIDE4LjE2MDUgOC4yMDk3OSAxOC4xMjY3IDguMjA5NzlIMTQuMjg3N0MxNC4xNDIzIDguMjA5NzkgMTQuMDI1NiA4LjMyNjE0IDE0LjAyNTYgOC40NzEwN0MxNC4wMjU2IDguNjE1OTkgMTQuMTQyMyA4LjczMjM1IDE0LjI4NzcgOC43MzIzNUgxNy40OTM2TDE0LjAwOTEgMTIuMjA1NUMxMy45MDY3IDEyLjMwNzYgMTMuOTA2NyAxMi40NzI5IDE0LjAwOTEgMTIuNTc1QzE0LjA2MDMgMTIuNjI2IDE0LjEyNjggMTIuNjUxNiAxNC4xOTQ0IDEyLjY1MTZDMTQuMjYyIDEyLjY1MTYgMTQuMzI4NiAxMi42MjYgMTQuMzc5OCAxMi41NzVMMTcuODY0MyA5LjEwMTgyVjEyLjI5NzNDMTcuODY0MyAxMi40NDIyIDE3Ljk4MSAxMi41NTg2IDE4LjEyNjQgMTIuNTU4NkMxOC4yNzE4IDEyLjU1ODYgMTguMzg4NiAxMi40NDIyIDE4LjM4ODYgMTIuMjk3M1Y4LjQ3MDgzQzE4LjM4ODYgOC40MzcxNSAxOC4zODE0IDguNDAyNDUgMTguMzY4MSA4LjM3MDgxQzE4LjM0MTUgOC4zMDY1MSAxOC4yOTEzIDguMjU2NSAxOC4yMjY4IDguMjI5OTZMMTguMjI3IDguMjMwMlpNMTIuNDM2NSAxMy43NzQzTDguOTUxOTcgMTcuMjQ3NVYxNC4wNTJDOC45NTE5NyAxMy45MDcxIDguODM1MjQgMTMuNzkwOCA4LjY4OTg0IDEzLjc5MDhDOC41NDQ0MyAxMy43OTA4IDguNDI3NyAxMy45MDcxIDguNDI3NyAxNC4wNTJWMTcuODc4NUM4LjQyNzcgMTcuOTEyMiA4LjQzNDg3IDE3Ljk0NjkgOC40NDgxOCAxNy45Nzg1QzguNDc0OCAxOC4wNDI4IDguNTI2IDE4LjA5MjggOC41ODk0OSAxOC4xMTkzQzguNjIxMjMgMTguMTMyNiA4LjY1NjA1IDE4LjEzOTggOC42ODk4MyAxOC4xMzk4SDEyLjUyODhDMTIuNjc0MiAxOC4xMzk4IDEyLjc5MDkgMTguMDIzNCAxMi43OTA5IDE3Ljg3ODVDMTIuNzkwOSAxNy43MzM2IDEyLjY3NDIgMTcuNjE3MiAxMi41Mjg4IDE3LjYxNzJIOS4zMjI4OEwxMi44MDc0IDE0LjE0NEMxMi45MDk4IDE0LjA0MTkgMTIuOTA5OCAxMy44NzY2IDEyLjgwNzQgMTMuNzc0NUMxMi43MDUgMTMuNjcyNCAxMi41MzkxIDEzLjY3MTQgMTIuNDM2NyAxMy43NzQ1TDEyLjQzNjUgMTMuNzc0M1pNMTguOTEzIDYuMzgwODZINy45MDM0NEM3LjE4MDUzIDYuMzgwODYgNi41OTI3NyA2Ljk2NjcgNi41OTI3NyA3LjY4NzI2VjE4LjY2MUM2LjU5Mjc3IDE5LjM4MTYgNy4xODA1MyAxOS45Njc0IDcuOTAzNDQgMTkuOTY3NEgxOC45MTNDMTkuNjM1OSAxOS45Njc0IDIwLjIyMzcgMTkuMzgxNiAyMC4yMjM3IDE4LjY2MVY3LjY4NzI2QzIwLjIyMzcgNi45NjY3IDE5LjYzNTkgNi4zODA4NiAxOC45MTMgNi4zODA4NlpNMTkuNjk5NCAxOC42NjFDMTkuNjk5NCAxOS4wOTI3IDE5LjM0NjEgMTkuNDQ0OSAxOC45MTMgMTkuNDQ0OUg3LjkwMzQ0QzcuNDcwMzIgMTkuNDQ0OSA3LjExNzA0IDE5LjA5MjcgNy4xMTcwNCAxOC42NjFWNy42ODcyNkM3LjExNzA0IDcuMjU1NTUgNy40NzAzMiA2LjkwMzQyIDcuOTAzNDQgNi45MDM0MkgxOC45MTNDMTkuMzQ2MSA2LjkwMzQyIDE5LjY5OTQgNy4yNTU1NSAxOS42OTk0IDcuNjg3MjZWMTguNjYxWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==\"\n\n//# sourceURL=webpack:///./src/images/full-screen-black.svg?");

/***/ }),

/***/ "./src/images/full-screen-white.svg":
/*!******************************************!*\
  !*** ./src/images/full-screen-white.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHZpZXdCb3g9IjAgMCAyNyAyNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjIyNyA4LjIzMDJDMTguMTk1MyA4LjIxNjkzIDE4LjE2MDUgOC4yMDk3OSAxOC4xMjY3IDguMjA5NzlIMTQuMjg3N0MxNC4xNDIzIDguMjA5NzkgMTQuMDI1NiA4LjMyNjE0IDE0LjAyNTYgOC40NzEwN0MxNC4wMjU2IDguNjE1OTkgMTQuMTQyMyA4LjczMjM1IDE0LjI4NzcgOC43MzIzNUgxNy40OTM2TDE0LjAwOTEgMTIuMjA1NUMxMy45MDY3IDEyLjMwNzYgMTMuOTA2NyAxMi40NzI5IDE0LjAwOTEgMTIuNTc1QzE0LjA2MDMgMTIuNjI2IDE0LjEyNjggMTIuNjUxNiAxNC4xOTQ0IDEyLjY1MTZDMTQuMjYyIDEyLjY1MTYgMTQuMzI4NiAxMi42MjYgMTQuMzc5OCAxMi41NzVMMTcuODY0MyA5LjEwMTgyVjEyLjI5NzNDMTcuODY0MyAxMi40NDIyIDE3Ljk4MSAxMi41NTg2IDE4LjEyNjQgMTIuNTU4NkMxOC4yNzE4IDEyLjU1ODYgMTguMzg4NiAxMi40NDIyIDE4LjM4ODYgMTIuMjk3M1Y4LjQ3MDgzQzE4LjM4ODYgOC40MzcxNSAxOC4zODE0IDguNDAyNDUgMTguMzY4MSA4LjM3MDgxQzE4LjM0MTUgOC4zMDY1MSAxOC4yOTEzIDguMjU2NSAxOC4yMjY4IDguMjI5OTZMMTguMjI3IDguMjMwMlpNMTIuNDM2NSAxMy43NzQzTDguOTUxOTcgMTcuMjQ3NVYxNC4wNTJDOC45NTE5NyAxMy45MDcxIDguODM1MjQgMTMuNzkwOCA4LjY4OTg0IDEzLjc5MDhDOC41NDQ0MyAxMy43OTA4IDguNDI3NyAxMy45MDcxIDguNDI3NyAxNC4wNTJWMTcuODc4NUM4LjQyNzcgMTcuOTEyMiA4LjQzNDg3IDE3Ljk0NjkgOC40NDgxOCAxNy45Nzg1QzguNDc0OCAxOC4wNDI4IDguNTI2IDE4LjA5MjggOC41ODk0OSAxOC4xMTkzQzguNjIxMjMgMTguMTMyNiA4LjY1NjA1IDE4LjEzOTggOC42ODk4MyAxOC4xMzk4SDEyLjUyODhDMTIuNjc0MiAxOC4xMzk4IDEyLjc5MDkgMTguMDIzNCAxMi43OTA5IDE3Ljg3ODVDMTIuNzkwOSAxNy43MzM2IDEyLjY3NDIgMTcuNjE3MiAxMi41Mjg4IDE3LjYxNzJIOS4zMjI4OEwxMi44MDc0IDE0LjE0NEMxMi45MDk4IDE0LjA0MTkgMTIuOTA5OCAxMy44NzY2IDEyLjgwNzQgMTMuNzc0NUMxMi43MDUgMTMuNjcyNCAxMi41MzkxIDEzLjY3MTQgMTIuNDM2NyAxMy43NzQ1TDEyLjQzNjUgMTMuNzc0M1pNMTguOTEzIDYuMzgwODZINy45MDM0NEM3LjE4MDUzIDYuMzgwODYgNi41OTI3NyA2Ljk2NjcgNi41OTI3NyA3LjY4NzI2VjE4LjY2MUM2LjU5Mjc3IDE5LjM4MTYgNy4xODA1MyAxOS45Njc0IDcuOTAzNDQgMTkuOTY3NEgxOC45MTNDMTkuNjM1OSAxOS45Njc0IDIwLjIyMzcgMTkuMzgxNiAyMC4yMjM3IDE4LjY2MVY3LjY4NzI2QzIwLjIyMzcgNi45NjY3IDE5LjYzNTkgNi4zODA4NiAxOC45MTMgNi4zODA4NlpNMTkuNjk5NCAxOC42NjFDMTkuNjk5NCAxOS4wOTI3IDE5LjM0NjEgMTkuNDQ0OSAxOC45MTMgMTkuNDQ0OUg3LjkwMzQ0QzcuNDcwMzIgMTkuNDQ0OSA3LjExNzA0IDE5LjA5MjcgNy4xMTcwNCAxOC42NjFWNy42ODcyNkM3LjExNzA0IDcuMjU1NTUgNy40NzAzMiA2LjkwMzQyIDcuOTAzNDQgNi45MDM0MkgxOC45MTNDMTkuMzQ2MSA2LjkwMzQyIDE5LjY5OTQgNy4yNTU1NSAxOS42OTk0IDcuNjg3MjZWMTguNjYxWiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K\"\n\n//# sourceURL=webpack:///./src/images/full-screen-white.svg?");

/***/ }),

/***/ "./src/images/no-volume-black.svg":
/*!****************************************!*\
  !*** ./src/images/no-volume-black.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05LjMzMjc5IDAuNzUzMTM3QzguOTMwOTkgMC41ODQxMjUgOC40NjY1MyAwLjY4MDg3NiA4LjE2NDg2IDAuOTk1MDNMNS4yNTIwNCAzLjk4ODM2SDEuODUzMzlWMy45ODc3NEMxLjQxODQyIDMuOTg3MTMgMS4wMDA2NCA0LjE1OTgzIDAuNjkzNDUyIDQuNDY2NjJDMC4zODU2NTYgNC43NzM0MiAwLjIxMzYyMyA1LjE4OTg0IDAuMjE0ODUgNS42MjM0VjExLjE1NzVDMC4yMTQ4NSAxMi4wNTgzIDAuOTQ3MTc2IDEyLjc4ODIgMS44NTA4NyAxMi43ODgySDUuNjcxNjdMOC4xNjQ4NiAxNS4zNTI3QzguMzYzOTIgMTUuNTU4NSA4LjYzNzkzIDE1LjY3NDggOC45MjQ4NCAxNS42NzQ4QzkuMDY0OTEgMTUuNjc0OCA5LjIwMzE1IDE1LjY0NzMgOS4zMzI3OSAxNS41OTQ2QzkuNzM5NSAxNS40MzYgMTAuMDA0OSAxNS4wNDI5IDEwIDE0LjYwNzVWMS43NDAyN0MxMC4wMDQ5IDEuMzA0ODggOS43Mzk1MiAwLjkxMTcxOSA5LjMzMjc5IDAuNzUzMTE3VjAuNzUzMTM3Wk05LjUxNDY0IDE0LjYwODFWMTQuNjA3NUM5LjUxNDY0IDE0Ljg0MzkgOS4zNzAyNiAxNS4wNTY0IDkuMTUwOTMgMTUuMTQ1MkM4LjkzMTYgMTUuMjM0IDguNjc5NyAxNS4xODEzIDguNTE0NDMgMTUuMDExN0w1Ljg3ODExIDEyLjMwMkgxLjg1MDk3QzEuMjE2MzEgMTIuMzAyIDAuNzAxNDczIDExLjc5IDAuNzAwMjQ3IDExLjE1NzRWNS42MjMzNkMwLjcwMDI0NyA0Ljk5MDE2IDEuMjE1NyA0LjQ3Njk5IDEuODUwOTcgNC40NzY5OUg1LjQ1ODY1TDguNTEyNyAxLjMzMTI5SDguNTEyMDlDOC42NzczNiAxLjE2MDQ0IDguOTI5ODYgMS4xMDY1NCA5LjE1MDQyIDEuMTk1MzRDOS4zNzE1OSAxLjI4NDEzIDkuNTE1MzYgMS40OTc4NSA5LjUxNDc1IDEuNzM1NDVMOS41MTQ2NCAxNC42MDgxWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE0LjAwNzUgOC40MTU0NEwxNS44Njk3IDYuNTU5MzFMMTUuODY5MSA2LjU1OTkyQzE1Ljk1MjEgNi40NjM3OCAxNS45NDY1IDYuMzIwNDkgMTUuODU2OCA2LjIzMTA3QzE1Ljc2NzEgNi4xNDE2NiAxNS42MjM0IDYuMTM2MTUgMTUuNTI2OSA2LjIxODIxTDEzLjY2NDcgOC4wNzQzNEwxMS44MDI1IDYuMjE4MjFIMTEuODAzMUMxMS43MDY3IDYuMTM2MTUgMTEuNTYzNSA2LjE0MTY2IDExLjQ3MzggNi4yMzEwN0MxMS4zODQxIDYuMzIwNDggMTEuMzc4NiA2LjQ2Mzc4IDExLjQ2MDkgNi41NTk5MkwxMy4zMjMxIDguNDE1NDNMMTEuNDYwOSAxMC4yNzE2QzExLjQwOTMgMTAuMzE1IDExLjM3ODYgMTAuMzc4NyAxMS4zNzYxIDEwLjQ0NjFDMTEuMzczNyAxMC41MTM0IDExLjM5OTUgMTAuNTc4NCAxMS40NDc0IDEwLjYyNjFDMTEuNDk0NyAxMC42NzM5IDExLjU2MDQgMTAuNjk5NiAxMS42MjggMTAuNjk3MkMxMS42OTU2IDEwLjY5NDEgMTEuNzU5NSAxMC42NjM1IDExLjgwMzEgMTAuNjEyNkwxMy42NjUzIDguNzU2NTJMMTUuNTI3NSAxMC42MTI2SDE1LjUyNjlDMTUuNjIzNCAxMC42OTQ3IDE1Ljc2NzEgMTAuNjg5MiAxNS44NTY4IDEwLjU5OThDMTUuOTQ2NSAxMC41MTA0IDE1Ljk1MiAxMC4zNjc3IDE1Ljg2OTEgMTAuMjcxNUwxNC4wMDc1IDguNDE1NDRaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjE1LjcyOCIgaGVpZ2h0PSIxNS42NzY4IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4yMTQ4NDQgMC4zMzU5MzgpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==\"\n\n//# sourceURL=webpack:///./src/images/no-volume-black.svg?");

/***/ }),

/***/ "./src/images/no-volume-white.svg":
/*!****************************************!*\
  !*** ./src/images/no-volume-white.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05LjMzMjc5IDAuNzUzMTM3QzguOTMwOTkgMC41ODQxMjUgOC40NjY1MyAwLjY4MDg3NiA4LjE2NDg2IDAuOTk1MDNMNS4yNTIwNCAzLjk4ODM2SDEuODUzMzlWMy45ODc3NEMxLjQxODQyIDMuOTg3MTMgMS4wMDA2NCA0LjE1OTgzIDAuNjkzNDUyIDQuNDY2NjJDMC4zODU2NTYgNC43NzM0MiAwLjIxMzYyMyA1LjE4OTg0IDAuMjE0ODUgNS42MjM0VjExLjE1NzVDMC4yMTQ4NSAxMi4wNTgzIDAuOTQ3MTc2IDEyLjc4ODIgMS44NTA4NyAxMi43ODgySDUuNjcxNjdMOC4xNjQ4NiAxNS4zNTI3QzguMzYzOTIgMTUuNTU4NSA4LjYzNzkzIDE1LjY3NDggOC45MjQ4NCAxNS42NzQ4QzkuMDY0OTEgMTUuNjc0OCA5LjIwMzE1IDE1LjY0NzMgOS4zMzI3OSAxNS41OTQ2QzkuNzM5NSAxNS40MzYgMTAuMDA0OSAxNS4wNDI5IDEwIDE0LjYwNzVWMS43NDAyN0MxMC4wMDQ5IDEuMzA0ODggOS43Mzk1MiAwLjkxMTcxOSA5LjMzMjc5IDAuNzUzMTE3VjAuNzUzMTM3Wk05LjUxNDY0IDE0LjYwODFWMTQuNjA3NUM5LjUxNDY0IDE0Ljg0MzkgOS4zNzAyNiAxNS4wNTY0IDkuMTUwOTMgMTUuMTQ1MkM4LjkzMTYgMTUuMjM0IDguNjc5NyAxNS4xODEzIDguNTE0NDMgMTUuMDExN0w1Ljg3ODExIDEyLjMwMkgxLjg1MDk3QzEuMjE2MzEgMTIuMzAyIDAuNzAxNDczIDExLjc5IDAuNzAwMjQ3IDExLjE1NzRWNS42MjMzNkMwLjcwMDI0NyA0Ljk5MDE2IDEuMjE1NyA0LjQ3Njk5IDEuODUwOTcgNC40NzY5OUg1LjQ1ODY1TDguNTEyNyAxLjMzMTI5SDguNTEyMDlDOC42NzczNiAxLjE2MDQ0IDguOTI5ODYgMS4xMDY1NCA5LjE1MDQyIDEuMTk1MzRDOS4zNzE1OSAxLjI4NDEzIDkuNTE1MzYgMS40OTc4NSA5LjUxNDc1IDEuNzM1NDVMOS41MTQ2NCAxNC42MDgxWiIgZmlsbD0iI2ZmZmZmZiIvPgo8cGF0aCBkPSJNMTQuMDA3NSA4LjQxNTQ0TDE1Ljg2OTcgNi41NTkzMUwxNS44NjkxIDYuNTU5OTJDMTUuOTUyMSA2LjQ2Mzc4IDE1Ljk0NjUgNi4zMjA0OSAxNS44NTY4IDYuMjMxMDdDMTUuNzY3MSA2LjE0MTY2IDE1LjYyMzQgNi4xMzYxNSAxNS41MjY5IDYuMjE4MjFMMTMuNjY0NyA4LjA3NDM0TDExLjgwMjUgNi4yMTgyMUgxMS44MDMxQzExLjcwNjcgNi4xMzYxNSAxMS41NjM1IDYuMTQxNjYgMTEuNDczOCA2LjIzMTA3QzExLjM4NDEgNi4zMjA0OCAxMS4zNzg2IDYuNDYzNzggMTEuNDYwOSA2LjU1OTkyTDEzLjMyMzEgOC40MTU0M0wxMS40NjA5IDEwLjI3MTZDMTEuNDA5MyAxMC4zMTUgMTEuMzc4NiAxMC4zNzg3IDExLjM3NjEgMTAuNDQ2MUMxMS4zNzM3IDEwLjUxMzQgMTEuMzk5NSAxMC41Nzg0IDExLjQ0NzQgMTAuNjI2MUMxMS40OTQ3IDEwLjY3MzkgMTEuNTYwNCAxMC42OTk2IDExLjYyOCAxMC42OTcyQzExLjY5NTYgMTAuNjk0MSAxMS43NTk1IDEwLjY2MzUgMTEuODAzMSAxMC42MTI2TDEzLjY2NTMgOC43NTY1MkwxNS41Mjc1IDEwLjYxMjZIMTUuNTI2OUMxNS42MjM0IDEwLjY5NDcgMTUuNzY3MSAxMC42ODkyIDE1Ljg1NjggMTAuNTk5OEMxNS45NDY1IDEwLjUxMDQgMTUuOTUyIDEwLjM2NzcgMTUuODY5MSAxMC4yNzE1TDE0LjAwNzUgOC40MTU0NFoiIGZpbGw9IiNmZmZmZmYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxNS43MjgiIGhlaWdodD0iMTUuNjc2OCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMjE0ODQ0IDAuMzM1OTM4KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=\"\n\n//# sourceURL=webpack:///./src/images/no-volume-white.svg?");

/***/ }),

/***/ "./src/images/pause-black.svg":
/*!************************************!*\
  !*** ./src/images/pause-black.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCI+DQogIDx0aXRsZT4NCiAgICBwYXVzZQ0KICA8L3RpdGxlPg0KICA8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSIxNiIgeD0iMyIgeT0iMiIgcng9IjEiIHJ5PSIxIi8+DQogIDxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjE2IiB4PSIxMSIgeT0iMiIgcng9IjEiIHJ5PSIxIi8+DQo8L3N2Zz4NCg==\"\n\n//# sourceURL=webpack:///./src/images/pause-black.svg?");

/***/ }),

/***/ "./src/images/pause-white.svg":
/*!************************************!*\
  !*** ./src/images/pause-white.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCI+DQogIDx0aXRsZT4NCiAgICBwYXVzZQ0KICA8L3RpdGxlPg0KICA8cmVjdCBmaWxsPSIjZmZmZmZmIiB3aWR0aD0iNiIgaGVpZ2h0PSIxNiIgeD0iMyIgeT0iMiIgcng9IjEiIHJ5PSIxIi8+DQogIDxyZWN0IGZpbGw9IiNmZmZmZmYiIHdpZHRoPSI2IiBoZWlnaHQ9IjE2IiB4PSIxMSIgeT0iMiIgcng9IjEiIHJ5PSIxIi8+DQo8L3N2Zz4NCg==\"\n\n//# sourceURL=webpack:///./src/images/pause-white.svg?");

/***/ }),

/***/ "./src/images/play-black.svg":
/*!***********************************!*\
  !*** ./src/images/play-black.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMSAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMDI5MyAxMS4wNjY4VjEuMDI1MzlMOS40MzcyNiA2LjA0NDc1TDEuMDI5MyAxMS4wNjY4WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTEuODUxOSAxMS4wNjc1VjEwLjA2OTdWNy42NzU3VjQuNzc3MDlWMi4yNTc5NEMxLjg1MTkgMS44NTQwNSAxLjg2NjEgMS40NDY4OCAxLjg1MTkgMS4wNDAyNlYxLjAyMzM5QzEuNDM3OTUgMS4yNjAxNyAxLjAyMTI3IDEuNDk2OTUgMC42MDc4NjQgMS43MzQyOUMwLjg4NDc0NiAxLjkwMTQgMS4xNjQzNSAyLjA2NTc5IDEuNDQxMjIgMi4yMzI5QzIuMTEyMzkgMi42MzQwNyAyLjc4MzU3IDMuMDM1NzkgMy40NTQxMiAzLjQzNDI0QzQuMjYyMzYgMy45MTY1MiA1LjA3MDEyIDQuMzk4OCA1Ljg3ODMzIDQuODgzMkM2LjU3NzM1IDUuMzAxMjQgNy4yNzYzNyA1LjcxOTI5IDcuOTc1MzkgNi4xMzQ2MkM4LjMxNjcgNi4zMzgyIDguNjUyMDEgNi41NTI2NyA4Ljk5ODggNi43NDQ4MkM5LjAwNDI2IDYuNzQ3NTQgOS4wMDk3MiA2Ljc1MDI2IDkuMDEyOTkgNi43NTI5OFY1LjMyODk3QzguNzM2MTEgNS40OTYwOCA4LjQ1NjUgNS42NjA0NyA4LjE3OTY0IDUuODI3NThDNy41MDg0NiA2LjIyODc1IDYuODM3MjkgNi42MzA0NyA2LjE2Njc0IDcuMDI4OTJDNS4zNTg1IDcuNTExMiA0LjU1MDc0IDcuOTkzNDggMy43NDI1MyA4LjQ3Nzg4QzMuMDQzNTEgOC44OTU5MiAyLjM0NDQ5IDkuMzEzOTcgMS42NDU0NyA5LjcyOTNDMS4zMDQxNSA5LjkzMjg4IDAuOTYwNjU0IDEwLjEzMDUgMC42MjIwNjMgMTAuMzM5NUMwLjYxNjYwMiAxMC4zNDIyIDAuNjExMTQxIDEwLjM0NDkgMC42MDc4NjQgMTAuMzQ3N0MwLjIzNTk1NyAxMC41NzA4IDAuMDY4MzA0MiAxMS4wOTcyIDAuMzExMzI2IDExLjQ3NjZDMC41NTE2MjEgMTEuODQ3MyAxLjA0NjkzIDEyLjAwOSAxLjQ0Mzk2IDExLjc3MjJDMS43MjA4NCAxMS42MDUxIDIuMDAwNDUgMTEuNDQwNyAyLjI3NzMyIDExLjI3MzZDMi45NDg0OSAxMC44NzI0IDMuNjE5NjYgMTAuNDcwNyA0LjI5MDIyIDEwLjA3MjJDNS4wOTg0NiA5LjU4OTk2IDUuOTA2MjIgOS4xMDc2OCA2LjcxNDQyIDguNjIzMjlDNy40MTM0NCA4LjIwNTI0IDguMTEyNDcgNy43ODcxOSA4LjgxMTQ5IDcuMzcxODZDOS4xNTI4IDcuMTY4MjggOS40OTYzIDYuOTcwNjkgOS44MzQ4OSA2Ljc2MTY2QzkuODQwMzYgNi43NTg5NCA5Ljg0NTgyIDYuNzU2MjIgOS44NDkwOSA2Ljc1MzVDMTAuMzg1OSA2LjQzMjg4IDEwLjM4NTkgNS42NDk1OSA5Ljg0OTA5IDUuMzI5NDlDOS41NzIyMSA1LjE2MjM4IDkuMjkyNiA0Ljk5Nzk5IDkuMDE1NzMgNC44MzA4OEM4LjM0NDU2IDQuNDI5NzEgNy42NzMzOSA0LjAyNzk5IDcuMDAyODMgMy42Mjk1NEM2LjE5NDYgMy4xNDcyNyA1LjM4Njg0IDIuNjY0OTggNC41Nzg2MyAyLjE4MDU5QzMuODc5NjEgMS43NjI1NCAzLjE4MDU5IDEuMzQ0NDkgMi40ODE1NyAwLjkyOTE2QzIuMTQwMjUgMC43MjU1ODQgMS44MDQ5NSAwLjUxMzgyOSAxLjQ1ODE2IDAuMzE4OTYzQzEuNDUyNyAwLjMxNjI0MiAxLjQ0NzI0IDAuMzEzNTIgMS40NDM5NiAwLjMxMDc5OEMwLjkwNDQwMyAtMC4wMTI1MzM3IDAuMTk5OTMgMC40MDI3OTEgMC4xOTk5MyAxLjAyMTdWMi4wMTk0N1Y0LjQxMzQ5VjcuMzEyMVY5LjgzMTI1QzAuMTk5OTMgMTAuMjM1MSAwLjE5MTczOCAxMC42NDIzIDAuMTk5OTMgMTEuMDQ4OVYxMS4wNjU4QzAuMTk5OTMgMTEuNDk4IDAuNTgwMDI5IDExLjkxMDEgMS4wMjc4NCAxMS44OTFDMS40NzE4MyAxMS44NzAzIDEuODUxOTEgMTEuNTMwMSAxLjg1MTkxIDExLjA2NzRMMS44NTE5IDExLjA2NzVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K\"\n\n//# sourceURL=webpack:///./src/images/play-black.svg?");

/***/ }),

/***/ "./src/images/play-white.svg":
/*!***********************************!*\
  !*** ./src/images/play-white.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMSAxMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuMDI5MyAxMS4zMTA5VjEuMjY5NTNMOS40MzcyNiA2LjI4ODg5TDEuMDI5MyAxMS4zMTA5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEuODUxOSAxMS4zMTE2VjEwLjMxMzlWNy45MTk4NFY1LjAyMTIzVjIuNTAyMDhDMS44NTE5IDIuMDk4MTkgMS44NjYxIDEuNjkxMDIgMS44NTE5IDEuMjg0NFYxLjI2NzUzQzEuNDM3OTUgMS41MDQzMSAxLjAyMTI3IDEuNzQxMDkgMC42MDc4NjQgMS45Nzg0M0MwLjg4NDc0NiAyLjE0NTU0IDEuMTY0MzUgMi4zMDk5MyAxLjQ0MTIyIDIuNDc3MDRDMi4xMTIzOSAyLjg3ODIxIDIuNzgzNTcgMy4yNzk5MyAzLjQ1NDEyIDMuNjc4MzhDNC4yNjIzNiA0LjE2MDY2IDUuMDcwMTIgNC42NDI5NCA1Ljg3ODMzIDUuMTI3MzRDNi41NzczNSA1LjU0NTM4IDcuMjc2MzcgNS45NjM0MyA3Ljk3NTM5IDYuMzc4NzZDOC4zMTY3IDYuNTgyMzQgOC42NTIwMSA2Ljc5NjgxIDguOTk4OCA2Ljk4ODk2QzkuMDA0MjYgNi45OTE2OCA5LjAwOTcyIDYuOTk0NCA5LjAxMjk5IDYuOTk3MTJWNS41NzMxMUM4LjczNjExIDUuNzQwMjIgOC40NTY1IDUuOTA0NjEgOC4xNzk2NCA2LjA3MTcyQzcuNTA4NDYgNi40NzI4OSA2LjgzNzI5IDYuODc0NjEgNi4xNjY3NCA3LjI3MzA2QzUuMzU4NSA3Ljc1NTM0IDQuNTUwNzQgOC4yMzc2MyAzLjc0MjUzIDguNzIyMDJDMy4wNDM1MSA5LjE0MDA3IDIuMzQ0NDkgOS41NTgxMSAxLjY0NTQ3IDkuOTczNDRDMS4zMDQxNSAxMC4xNzcgMC45NjA2NTQgMTAuMzc0NiAwLjYyMjA2MyAxMC41ODM2QzAuNjE2NjAyIDEwLjU4NjQgMC42MTExNDEgMTAuNTg5MSAwLjYwNzg2NCAxMC41OTE4QzAuMjM1OTU3IDEwLjgxNSAwLjA2ODMwNDIgMTEuMzQxMyAwLjMxMTMyNiAxMS43MjA4QzAuNTUxNjIxIDEyLjA5MTUgMS4wNDY5MyAxMi4yNTMxIDEuNDQzOTYgMTIuMDE2M0MxLjcyMDg0IDExLjg0OTIgMi4wMDA0NSAxMS42ODQ4IDIuMjc3MzIgMTEuNTE3N0MyLjk0ODQ5IDExLjExNjYgMy42MTk2NiAxMC43MTQ4IDQuMjkwMjIgMTAuMzE2NEM1LjA5ODQ2IDkuODM0MTEgNS45MDYyMiA5LjM1MTgyIDYuNzE0NDIgOC44Njc0M0M3LjQxMzQ0IDguNDQ5MzggOC4xMTI0NyA4LjAzMTMzIDguODExNDkgNy42MTZDOS4xNTI4IDcuNDEyNDMgOS40OTYzIDcuMjE0ODMgOS44MzQ4OSA3LjAwNThDOS44NDAzNiA3LjAwMzA4IDkuODQ1ODIgNy4wMDAzNiA5Ljg0OTA5IDYuOTk3NjRDMTAuMzg1OSA2LjY3NzAyIDEwLjM4NTkgNS44OTM3MyA5Ljg0OTA5IDUuNTczNjNDOS41NzIyMSA1LjQwNjUyIDkuMjkyNiA1LjI0MjEzIDkuMDE1NzMgNS4wNzUwMkM4LjM0NDU2IDQuNjczODUgNy42NzMzOSA0LjI3MjE0IDcuMDAyODMgMy44NzM2OEM2LjE5NDYgMy4zOTE0MSA1LjM4Njg0IDIuOTA5MTIgNC41Nzg2MyAyLjQyNDczQzMuODc5NjEgMi4wMDY2OCAzLjE4MDU5IDEuNTg4NjMgMi40ODE1NyAxLjE3MzNDMi4xNDAyNSAwLjk2OTcyNSAxLjgwNDk1IDAuNzU3OTcgMS40NTgxNiAwLjU2MzEwNEMxLjQ1MjcgMC41NjAzODIgMS40NDcyNCAwLjU1NzY2MSAxLjQ0Mzk2IDAuNTU0OTM5QzAuOTA0NDAzIDAuMjMxNjA3IDAuMTk5OTMgMC42NDY5MzIgMC4xOTk5MyAxLjI2NTg0VjIuMjYzNjFWNC42NTc2M1Y3LjU1NjI0VjEwLjA3NTRDMC4xOTk5MyAxMC40NzkzIDAuMTkxNzM4IDEwLjg4NjQgMC4xOTk5MyAxMS4yOTMxVjExLjMwOTlDMC4xOTk5MyAxMS43NDIxIDAuNTgwMDI5IDEyLjE1NDIgMS4wMjc4NCAxMi4xMzUyQzEuNDcxODMgMTIuMTE0NSAxLjg1MTkxIDExLjc3NDMgMS44NTE5MSAxMS4zMTE2TDEuODUxOSAxMS4zMTE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==\"\n\n//# sourceURL=webpack:///./src/images/play-white.svg?");

/***/ }),

/***/ "./src/images/volume-black.svg":
/*!*************************************!*\
  !*** ./src/images/volume-black.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05LjMzMjc5IDAuNzUzMTM3QzguOTMwOTkgMC41ODQxMjUgOC40NjY1MyAwLjY4MDg3NiA4LjE2NDg2IDAuOTk1MDNMNS4yNTIwNCAzLjk4ODM2SDEuODUzMzlWMy45ODc3NEMxLjQxODQyIDMuOTg3MTMgMS4wMDA2NCA0LjE1OTgzIDAuNjkzNDUyIDQuNDY2NjJDMC4zODU2NTYgNC43NzM0MiAwLjIxMzYyMyA1LjE4OTg0IDAuMjE0ODUgNS42MjM0VjExLjE1NzVDMC4yMTQ4NSAxMi4wNTgzIDAuOTQ3MTc2IDEyLjc4ODIgMS44NTA4NyAxMi43ODgySDUuNjcxNjdMOC4xNjQ4NiAxNS4zNTI3QzguMzYzOTIgMTUuNTU4NSA4LjYzNzkzIDE1LjY3NDggOC45MjQ4NCAxNS42NzQ4QzkuMDY0OTEgMTUuNjc0OCA5LjIwMzE1IDE1LjY0NzMgOS4zMzI3OSAxNS41OTQ2QzkuNzM5NSAxNS40MzYgMTAuMDA0OSAxNS4wNDI5IDEwIDE0LjYwNzVWMS43NDAyN0MxMC4wMDQ5IDEuMzA0ODggOS43Mzk1MiAwLjkxMTcxOSA5LjMzMjc5IDAuNzUzMTE3VjAuNzUzMTM3Wk05LjUxNDY0IDE0LjYwODFWMTQuNjA3NUM5LjUxNDY0IDE0Ljg0MzkgOS4zNzAyNiAxNS4wNTY0IDkuMTUwOTMgMTUuMTQ1MkM4LjkzMTYgMTUuMjM0IDguNjc5NyAxNS4xODEzIDguNTE0NDMgMTUuMDExN0w1Ljg3ODExIDEyLjMwMkgxLjg1MDk3QzEuMjE2MzEgMTIuMzAyIDAuNzAxNDczIDExLjc5IDAuNzAwMjQ3IDExLjE1NzRWNS42MjMzNkMwLjcwMDI0NyA0Ljk5MDE2IDEuMjE1NyA0LjQ3Njk5IDEuODUwOTcgNC40NzY5OUg1LjQ1ODY1TDguNTEyNyAxLjMzMTI5SDguNTEyMDlDOC42NzczNiAxLjE2MDQ0IDguOTI5ODYgMS4xMDY1NCA5LjE1MDQyIDEuMTk1MzRDOS4zNzE1OSAxLjI4NDEzIDkuNTE1MzYgMS40OTc4NSA5LjUxNDc1IDEuNzM1NDVMOS41MTQ2NCAxNC42MDgxWiIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iMTEiIHk9IjUiIHdpZHRoPSIxIiBoZWlnaHQ9IjYiIHJ4PSIwLjUiIGZpbGw9IiM3MzczNzMiLz4KPHJlY3QgeD0iMTMiIHk9IjMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEwIiByeD0iMC41IiBmaWxsPSIjNzM3MzczIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iMTUuNzI4IiBoZWlnaHQ9IjE1LjY3NjgiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjIxNDg0NCAwLjMzNTkzOCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K\"\n\n//# sourceURL=webpack:///./src/images/volume-black.svg?");

/***/ }),

/***/ "./src/images/volume-white.svg":
/*!*************************************!*\
  !*** ./src/images/volume-white.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05LjMzMjc5IDAuNzUzMTM3QzguOTMwOTkgMC41ODQxMjUgOC40NjY1MyAwLjY4MDg3NiA4LjE2NDg2IDAuOTk1MDNMNS4yNTIwNCAzLjk4ODM2SDEuODUzMzlWMy45ODc3NEMxLjQxODQyIDMuOTg3MTMgMS4wMDA2NCA0LjE1OTgzIDAuNjkzNDUyIDQuNDY2NjJDMC4zODU2NTYgNC43NzM0MiAwLjIxMzYyMyA1LjE4OTg0IDAuMjE0ODUgNS42MjM0VjExLjE1NzVDMC4yMTQ4NSAxMi4wNTgzIDAuOTQ3MTc2IDEyLjc4ODIgMS44NTA4NyAxMi43ODgySDUuNjcxNjdMOC4xNjQ4NiAxNS4zNTI3QzguMzYzOTIgMTUuNTU4NSA4LjYzNzkzIDE1LjY3NDggOC45MjQ4NCAxNS42NzQ4QzkuMDY0OTEgMTUuNjc0OCA5LjIwMzE1IDE1LjY0NzMgOS4zMzI3OSAxNS41OTQ2QzkuNzM5NSAxNS40MzYgMTAuMDA0OSAxNS4wNDI5IDEwIDE0LjYwNzVWMS43NDAyN0MxMC4wMDQ5IDEuMzA0ODggOS43Mzk1MiAwLjkxMTcxOSA5LjMzMjc5IDAuNzUzMTE3VjAuNzUzMTM3Wk05LjUxNDY0IDE0LjYwODFWMTQuNjA3NUM5LjUxNDY0IDE0Ljg0MzkgOS4zNzAyNiAxNS4wNTY0IDkuMTUwOTMgMTUuMTQ1MkM4LjkzMTYgMTUuMjM0IDguNjc5NyAxNS4xODEzIDguNTE0NDMgMTUuMDExN0w1Ljg3ODExIDEyLjMwMkgxLjg1MDk3QzEuMjE2MzEgMTIuMzAyIDAuNzAxNDczIDExLjc5IDAuNzAwMjQ3IDExLjE1NzRWNS42MjMzNkMwLjcwMDI0NyA0Ljk5MDE2IDEuMjE1NyA0LjQ3Njk5IDEuODUwOTcgNC40NzY5OUg1LjQ1ODY1TDguNTEyNyAxLjMzMTI5SDguNTEyMDlDOC42NzczNiAxLjE2MDQ0IDguOTI5ODYgMS4xMDY1NCA5LjE1MDQyIDEuMTk1MzRDOS4zNzE1OSAxLjI4NDEzIDkuNTE1MzYgMS40OTc4NSA5LjUxNDc1IDEuNzM1NDVMOS41MTQ2NCAxNC42MDgxWiIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB4PSIxMSIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iNiIgcng9IjAuNSIgZmlsbD0iIzlhOWE5YSIvPgo8cmVjdCB4PSIxMyIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMTAiIHJ4PSIwLjUiIGZpbGw9IiM5YTlhOWEiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxNS43MjgiIGhlaWdodD0iMTUuNjc2OCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMjE0ODQ0IDAuMzM1OTM4KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=\"\n\n//# sourceURL=webpack:///./src/images/volume-white.svg?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controls */ \"./src/Controls.tsx\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\nvar DEFAULT_VOLUME = 0.7;\n\nfunction VideoPlayer(props) {\n  var playerEl = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  var progressEl = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  var volumeEl = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0),\n      _useState2 = _slicedToArray(_useState, 2),\n      currentTime = _useState2[0],\n      setCurrentTime = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null),\n      _useState4 = _slicedToArray(_useState3, 2),\n      videoDuration = _useState4[0],\n      setVideoDuration = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState6 = _slicedToArray(_useState5, 2),\n      muted = _useState6[0],\n      setMuted = _useState6[1];\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      _useState8 = _slicedToArray(_useState7, 2),\n      isFullScreen = _useState8[0],\n      setIsFullScreen = _useState8[1];\n\n  var url = props.url,\n      _props$controls = props.controls,\n      controls = _props$controls === void 0 ? ['play', 'time', 'progress', 'volume', 'full-screen'] : _props$controls,\n      _props$height = props.height,\n      height = _props$height === void 0 ? '360px' : _props$height,\n      _props$width = props.width,\n      width = _props$width === void 0 ? '640px' : _props$width,\n      _props$isPlaying = props.isPlaying,\n      isPlaying = _props$isPlaying === void 0 ? false : _props$isPlaying,\n      _props$volume = props.volume,\n      volume = _props$volume === void 0 ? 0.7 : _props$volume,\n      _props$loop = props.loop,\n      loop = _props$loop === void 0 ? false : _props$loop,\n      _props$markers = props.markers,\n      markers = _props$markers === void 0 ? [] : _props$markers,\n      _props$timeStart = props.timeStart,\n      timeStart = _props$timeStart === void 0 ? 0 : _props$timeStart,\n      _props$onPlay = props.onPlay,\n      onPlay = _props$onPlay === void 0 ? function () {} : _props$onPlay,\n      _props$onPause = props.onPause,\n      onPause = _props$onPause === void 0 ? function () {} : _props$onPause,\n      _props$onVolume = props.onVolume,\n      onVolume = _props$onVolume === void 0 ? function () {} : _props$onVolume,\n      _props$onProgress = props.onProgress,\n      onProgress = _props$onProgress === void 0 ? function () {} : _props$onProgress,\n      _props$onDuration = props.onDuration,\n      onDuration = _props$onDuration === void 0 ? function () {} : _props$onDuration,\n      _props$onMarkerClick = props.onMarkerClick,\n      onMarkerClick = _props$onMarkerClick === void 0 ? function () {} : _props$onMarkerClick;\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    playerEl.current.addEventListener('timeupdate', handleProgress);\n    playerEl.current.addEventListener('durationchange', handleDurationLoaded);\n\n    if (timeStart) {\n      seekToPlayer();\n    }\n\n    if (isPlaying) {\n      playerEl.current.play();\n    }\n\n    return function () {\n      playerEl.current.removeEventListener('timeupdate', handleProgress);\n      playerEl.current.removeEventListener('durationchange', handleDurationLoaded);\n    };\n  }, []);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    seekToPlayer();\n  }, [timeStart]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    isPlaying ? playerEl.current.play() : playerEl.current.pause();\n  }, [isPlaying]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {\n    setVolume(volume);\n  }, [volume]);\n\n  var seekToPlayer = function seekToPlayer() {\n    if (timeStart && playerEl) {\n      playerEl.current.currentTime = timeStart;\n    }\n  };\n\n  var setVolume = function setVolume(value) {\n    playerEl.current.volume = value;\n    setMuted(!value);\n  };\n\n  var handlePlayerClick = function handlePlayerClick() {\n    if (isPlaying) {\n      onPause();\n    } else {\n      onPlay();\n    }\n  };\n\n  var handleDurationLoaded = function handleDurationLoaded(e) {\n    var duration = e.currentTarget['duration'];\n\n    if (duration === Infinity) {\n      duration = 0;\n    }\n\n    setVideoDuration(duration);\n    onDuration(duration);\n  };\n\n  var handleProgress = function handleProgress(e) {\n    var currentTarget = e.currentTarget;\n    var currentTime = currentTarget['currentTime'];\n    var duration = currentTarget['duration'];\n\n    if (duration) {\n      setCurrentTime(currentTime);\n      var percentage = 100 / duration * currentTime;\n      progressEl.current.value = percentage;\n      progressEl.current.innerHTML = percentage + '% played';\n\n      if (currentTime === duration) {\n        onPause();\n      }\n    }\n\n    onProgress(e);\n  };\n\n  var handleProgressClick = function handleProgressClick(e) {\n    var x = e['clientX'] - progressEl.current.getBoundingClientRect().left + document.body.scrollLeft;\n    var percentage = x * progressEl.current.max / progressEl.current.offsetWidth;\n    playerEl.current.currentTime = percentage / 100 * playerEl.current.duration;\n  };\n\n  var handleVolumeClick = function handleVolumeClick(e) {\n    var y = volumeEl.current.offsetWidth - (e['clientY'] - volumeEl.current.getBoundingClientRect().top + document.body.scrollTop);\n    var percentage = y * volumeEl.current.max / volumeEl.current.offsetWidth;\n    playerEl.current.muted = false;\n    onVolume(percentage / 100);\n  };\n\n  var handleMuteClick = function handleMuteClick() {\n    if (muted) {\n      playerEl.current.muted = false;\n      setVolume(DEFAULT_VOLUME);\n      setMuted(false);\n    } else {\n      playerEl.current.muted = true;\n      setVolume(0);\n      setMuted(true);\n    }\n  };\n\n  var handleFullScreenClick = function handleFullScreenClick() {\n    var videoWrap = document.getElementsByClassName('react-video-wrap')[0];\n\n    if (isFullScreen) {\n      document.body.classList.remove('react-video-full-screen');\n\n      if (document['exitFullscreen']) {\n        document['exitFullscreen']();\n      } else if (document['mozCancelFullScreen']) {\n        document['mozCancelFullScreen']();\n      } else if (document['webkitExitFullscreen']) {\n        document['webkitExitFullscreen']();\n      } else if (document['msExitFullscreen']) {\n        document['msExitFullscreen']();\n      }\n    } else {\n      document.body.classList.add('react-video-full-screen');\n\n      if (videoWrap['requestFullscreen']) {\n        videoWrap['requestFullscreen']();\n      } else if (videoWrap['mozRequestFullScreen']) {\n        videoWrap['mozRequestFullScreen']();\n      } else if (videoWrap['webkitRequestFullscreen']) {\n        videoWrap['webkitRequestFullscreen']();\n      } else if (videoWrap['msRequestFullscreen']) {\n        videoWrap['msRequestFullscreen']();\n      }\n    }\n\n    setIsFullScreen(!isFullScreen);\n  };\n\n  var handleMarkerClick = function handleMarkerClick(marker) {\n    playerEl.current.currentTime = marker['time'];\n    onMarkerClick(marker);\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"react-video-wrap\",\n    style: {\n      height: height,\n      width: width\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"video\", {\n    ref: playerEl,\n    className: \"react-video-player\",\n    loop: loop,\n    onClick: handlePlayerClick\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"source\", {\n    src: url,\n    type: \"video/mp4\"\n  })), isFullScreen ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: \"react-video-close\",\n    onClick: handleFullScreenClick\n  }, \"Close video\") : null, controls.length ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Controls__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    progressEl: progressEl,\n    volumeEl: volumeEl,\n    controls: controls,\n    isPlaying: isPlaying,\n    volume: volume,\n    currentTime: currentTime,\n    duration: videoDuration,\n    muted: muted,\n    markers: markers,\n    onPlayClick: onPlay,\n    onPauseClick: onPause,\n    onProgressClick: handleProgressClick,\n    onVolumeClick: handleVolumeClick,\n    onMuteClick: handleMuteClick,\n    onFullScreenClick: handleFullScreenClick,\n    onMarkerClick: handleMarkerClick\n  }) : null);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (VideoPlayer);\n void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/home/arthur/www/react-video-markers/src/index.tsx\"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, \"/home/arthur/www/react-video-markers/src/index.tsx\"); } }(); \n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\nif (typeof content === 'string') {\n  content = [[module.i, content, '']];\n}\n\nvar options = {}\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\")(content, options);\n\nif (content.locals) {\n  module.exports = content.locals;\n}\n\nif (true) {\n  if (!content.locals) {\n    module.hot.accept(\n      /*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\",\n      function () {\n        var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n        if (typeof newContent === 'string') {\n          newContent = [[module.i, newContent, '']];\n        }\n        \n        update(newContent);\n      }\n    )\n  }\n\n  module.hot.dispose(function() { \n    update();\n  });\n}\n\n//# sourceURL=webpack:///./src/styles.css?");

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./example/index.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./example/index.tsx */\"./example/index.tsx\");\n\n\n//# sourceURL=webpack:///multi_./example/index.tsx?");

/***/ })

/******/ });