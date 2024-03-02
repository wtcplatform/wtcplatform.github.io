"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[837],{661:function(t,e,n){n.d(e,{IO:function(){return eY},JU:function(){return eT},PL:function(){return e2},Xo:function(){return eJ},ad:function(){return ey},b9:function(){return eZ},hJ:function(){return eb},pl:function(){return e3}});var r,i,s=n(5723),a=n(6574),o=n(9858),l=n(8954);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}constructor(t){this.uid=t}}u.UNAUTHENTICATED=new u(null),u.GOOGLE_CREDENTIALS=new u("google-credentials-uid"),u.FIRST_PARTY=new u("first-party-uid"),u.MOCK_USER=new u("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let c="10.8.1",h=new o.Yd("@firebase/firestore");function d(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];if(h.logLevel<=o.in.DEBUG){let e=n.map(m);h.debug("Firestore (".concat(c,"): ").concat(t),...e)}}function f(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];if(h.logLevel<=o.in.ERROR){let e=n.map(m);h.error("Firestore (".concat(c,"): ").concat(t),...e)}}function p(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];if(h.logLevel<=o.in.WARN){let e=n.map(m);h.warn("Firestore (".concat(c,"): ").concat(t),...e)}}function m(t){if("string"==typeof t)return t;try{/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */return JSON.stringify(t)}catch(e){return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Unexpected state",e="FIRESTORE (".concat(c,") INTERNAL ASSERTION FAILED: ")+t;throw f(e),Error(e)}function y(t,e){t||g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let w="unknown",v="invalid-argument",_="unauthenticated",b="failed-precondition",T="unimplemented";class S extends l.ZR{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>"".concat(this.name,": [code=").concat(this.code,"]: ").concat(this.message)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer ".concat(t))}}class I{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(u.UNAUTHENTICATED))}shutdown(){}}class k{getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}constructor(t){this.token=t,this.changeListener=null}}class A{getToken(){return this.auth?this.auth.getToken().then(t=>t?(y("string"==typeof t.accessToken),new E(t.accessToken,new u(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}constructor(t){this.auth=null,t.onInit(t=>{this.auth=t})}}class V{l(){return this.o?this.o():null}get headers(){this.u.set("X-Goog-AuthUser",this.t);let t=this.l();return t&&this.u.set("Authorization",t),this.i&&this.u.set("X-Goog-Iam-Authorization-Token",this.i),this.u}constructor(t,e,n){this.t=t,this.i=e,this.o=n,this.type="FirstParty",this.user=u.FIRST_PARTY,this.u=new Map}}class N{getToken(){return Promise.resolve(new V(this.t,this.i,this.o))}start(t,e){t.enqueueRetryable(()=>e(u.FIRST_PARTY))}shutdown(){}invalidateToken(){}constructor(t,e,n){this.t=t,this.i=e,this.o=n}}class P{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class F{getToken(){return this.appCheck?this.appCheck.getToken().then(t=>t?(y("string"==typeof t.token),new P(t.token)):null):Promise.resolve(null)}invalidateToken(){}start(t,e){}shutdown(){}constructor(t){this.h=t,this.appCheck=null,t.onInit(t=>{this.appCheck=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t,e,n,r,i,s,a,o,l){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=l}}class R{static empty(){return new R("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof R&&t.projectId===this.projectId&&t.database===this.database}constructor(t,e){this.projectId=t,this.database=e||"(default)"}}class D{get length(){return this.len}isEqual(t){return 0===D.comparator(this,t)}child(t){let e=this.segments.slice(this.offset,this.limit());return t instanceof D?t.forEach(t=>{e.push(t)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){let n=Math.min(t.length,e.length);for(let r=0;r<n;r++){let n=t.get(r),i=e.get(r);if(n<i)return -1;if(n>i)return 1}return t.length<e.length?-1:t.length>e.length?1:0}constructor(t,e,n){void 0===e?e=0:e>t.length&&g(),void 0===n?n=t.length-e:n>t.length-e&&g(),this.segments=t,this.offset=e,this.len=n}}class O extends D{construct(t,e,n){return new O(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];let r=[];for(let t of e){if(t.indexOf("//")>=0)throw new S(v,"Invalid segment (".concat(t,"). Paths must not contain // in them."));r.push(...t.split("/").filter(t=>t.length>0))}return new O(r)}static emptyPath(){return new O([])}}let C=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class L extends D{construct(t,e,n){return new L(t,e,n)}static isValidIdentifier(t){return C.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),L.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new L(["__name__"])}static fromServerFormat(t){let e=[],n="",r=0,i=()=>{if(0===n.length)throw new S(v,"Invalid field path (".concat(t,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));e.push(n),n=""},s=!1;for(;r<t.length;){let e=t[r];if("\\"===e){if(r+1===t.length)throw new S(v,"Path has trailing escape character: "+t);let e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new S(v,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?s=!s:"."!==e||s?n+=e:i(),r++}if(i(),s)throw new S(v,"Unterminated ` in path: "+t);return new L(e)}static emptyPath(){return new L([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromPath(t){return new q(O.fromString(t))}static fromName(t){return new q(O.fromString(t).popFirst(5))}static empty(){return new q(O.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===O.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return O.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new q(new O(t.slice()))}constructor(t){this.path=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(t,e,n){if(!n)throw new S(v,"Function ".concat(t,"() cannot be called with an empty ").concat(e,"."))}function M(t){if(!q.isDocumentKey(t))throw new S(v,"Invalid document reference. Document references must have an even number of segments, but ".concat(t," has ").concat(t.length,"."))}function j(t){if(q.isDocumentKey(t))throw new S(v,"Invalid collection reference. Collection references must have an odd number of segments, but ".concat(t," has ").concat(t.length,"."))}function z(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t="".concat(t.substring(0,20),"...")),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{var e;let n=(e=t).constructor?e.constructor.name:null;return n?"a custom ".concat(n," object"):"an object"}}return"function"==typeof t?"a function":g()}function B(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new S(v,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=z(t);throw new S(v,"Expected type '".concat(e.name,"', but it was: ").concat(n))}}return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(t){let e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let G=null;function Y(){return null===G?G=268435456+Math.round(2147483648*Math.random()):G++,"0x"+G.toString(16)}function Q(t){return 0===t&&1/t==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let H={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};function W(t){if(void 0===t)return f("RPC_ERROR","HTTP error has no status"),w;switch(t){case 200:return"ok";case 400:return b;case 401:return _;case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 416:return"out-of-range";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return w;case 501:return T;case 503:return"unavailable";case 504:return"deadline-exceeded";default:return t>=200&&t<300?"ok":t>=400&&t<500?b:t>=500&&t<600?"internal":w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(i=r||(r={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";class J extends class{get R(){return!1}P(t,e,n,r,i){let s=Y(),a=this.I(t,e.toUriEncodedString());d("RestConnection","Sending RPC '".concat(t,"' ").concat(s,":"),a,n);let o={"google-cloud-resource-prefix":this.A,"x-goog-request-params":this.T};return this.V(o,r,i),this.p(t,a,o,n).then(e=>(d("RestConnection","Received RPC '".concat(t,"' ").concat(s,": "),e),e),e=>{throw p("RestConnection","RPC '".concat(t,"' ").concat(s," failed with error: "),e,"url: ",a,"request:",n),e})}g(t,e,n,r,i,s){return this.P(t,e,n,r,i)}V(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+c}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((e,n)=>t[n]=e),n&&n.headers.forEach((e,n)=>t[n]=e)}I(t,e){let n=H[t];return"".concat(this.m,"/v1/").concat(e,":").concat(n)}terminate(){}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.m=e+"://"+t.host,this.A="projects/".concat(n,"/databases/").concat(r),this.T="(default)"===this.databaseId.database?"project_id=".concat(n):"project_id=".concat(n,"&database_id=").concat(r)}}{v(t,e){throw Error("Not supported by FetchConnection")}async p(t,e,n,r){var i;let s;let a=JSON.stringify(r);try{s=await this.F(e,{method:"POST",headers:n,body:a})}catch(t){throw new S(W(t.status),"Request failed with error: "+t.statusText)}if(!s.ok){let t=await s.json();Array.isArray(t)&&(t=t[0]);let e=null===(i=null==t?void 0:t.error)||void 0===i?void 0:i.message;throw new S(W(s.status),"Request failed with error: ".concat(null!=e?e:s.statusText))}return s.json()}constructor(t,e){super(t),this.F=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{static newId(){let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length,n="";for(;n.length<20;){let r=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(t){let e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<e&&(n+=t.charAt(r[i]%t.length))}return n}}function Z(t,e){return t<e?-1:t>e?1:0}function $(t,e,n){return t.length===e.length&&t.every((t,r)=>n(t,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(t){let e=0;for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function te(t,e){for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{static fromBase64String(t){return new tr(function(t){try{return atob(t)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new tn("Invalid base64 string: "+t):t}}(t))}static fromUint8Array(t){return new tr(function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t))}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(t){let e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Z(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}constructor(t){this.binaryString=t}}tr.EMPTY_BYTE_STRING=new tr("");let ti=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ts(t){if(y(!!t),"string"==typeof t){let e=0,n=ti.exec(t);if(y(!!n),n[1]){let t=n[1];e=Number(t=(t+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(t).getTime()/1e3),nanos:e}}return{seconds:ta(t.seconds),nanos:ta(t.nanos)}}function ta(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function to(t){return"string"==typeof t?tr.fromBase64String(t):tr.fromUint8Array(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{static now(){return tl.fromMillis(Date.now())}static fromDate(t){return tl.fromMillis(t.getTime())}static fromMillis(t){let e=Math.floor(t/1e3);return new tl(e,Math.floor(1e6*(t-1e3*e)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Z(this.nanoseconds,t.nanoseconds):Z(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0||e>=1e9)throw new S(v,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800||t>=253402300800)throw new S(v,"Timestamp seconds out of range: "+t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function tc(t){let e=t.mapValue.fields.__previous_value__;return tu(e)?tc(e):e}function th(t){let e=ts(t.mapValue.fields.__local_write_time__.timestampValue);return new tl(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let td={};function tf(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?tu(t)?4:"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue?9007199254740991:10:g()}function tp(t,e){if(t===e)return!0;let n=tf(t);if(n!==tf(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return th(t).isEqual(th(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;let n=ts(t.timestampValue),r=ts(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return to(t.bytesValue).isEqual(to(e.bytesValue));case 7:return t.referenceValue===e.referenceValue;case 8:return ta(t.geoPointValue.latitude)===ta(e.geoPointValue.latitude)&&ta(t.geoPointValue.longitude)===ta(e.geoPointValue.longitude);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return ta(t.integerValue)===ta(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){let n=ta(t.doubleValue),r=ta(e.doubleValue);return n===r?Q(n)===Q(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return $(t.arrayValue.values||[],e.arrayValue.values||[],tp);case 10:return function(t,e){let n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(tt(n)!==tt(r))return!1;for(let t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!tp(n[t],r[t])))return!1;return!0}(t,e);default:return g()}}function tm(t,e){return void 0!==(t.values||[]).find(t=>tp(t,e))}function tg(t,e){if(t===e)return 0;let n=tf(t),r=tf(e);if(n!==r)return Z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Z(t.booleanValue,e.booleanValue);case 2:return function(t,e){let n=ta(t.integerValue||t.doubleValue),r=ta(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return ty(t.timestampValue,e.timestampValue);case 4:return ty(th(t),th(e));case 5:return Z(t.stringValue,e.stringValue);case 6:return function(t,e){let n=to(t),r=to(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){let n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){let e=Z(n[t],r[t]);if(0!==e)return e}return Z(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){let n=Z(ta(t.latitude),ta(e.latitude));return 0!==n?n:Z(ta(t.longitude),ta(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){let n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){let e=tg(n[t],r[t]);if(e)return e}return Z(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){if(t===td&&e===td)return 0;if(t===td)return 1;if(e===td)return -1;let n=t.fields||{},r=Object.keys(n),i=e.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let t=0;t<r.length&&t<s.length;++t){let e=Z(r[t],s[t]);if(0!==e)return e;let a=tg(n[r[t]],i[s[t]]);if(0!==a)return a}return Z(r.length,s.length)}(t.mapValue,e.mapValue);default:throw g()}}function ty(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Z(t,e);let n=ts(t),r=ts(e),i=Z(n.seconds,r.seconds);return 0!==i?i:Z(n.nanos,r.nanos)}function tw(t,e){return{referenceValue:"projects/".concat(t.projectId,"/databases/").concat(t.database,"/documents/").concat(e.path.canonicalString())}}function tv(t){return!!t&&"arrayValue"in t}function t_(t){return!!t&&"nullValue"in t}function tb(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function tT(t){return!!t&&"mapValue"in t}function tS(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){let e={mapValue:{fields:{}}};return te(t.mapValue.fields,(t,n)=>e.mapValue.fields[t]=tS(n)),e}if(t.arrayValue){let e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=tS(t.arrayValue.values[n]);return e}return Object.assign({},t)}class tE{constructor(t,e){this.position=t,this.inclusive=e}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{}class tk extends tI{static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new tV(t,e,n):"array-contains"===e?new tx(t,n):"in"===e?new tR(t,n):"not-in"===e?new tD(t,n):"array-contains-any"===e?new tO(t,n):new tk(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new tN(t,n):new tP(t,n)}matches(t){let e=t.data.field(this.field);return"!="===this.op?null!==e&&this.matchesComparison(tg(e,this.value)):null!==e&&tf(this.value)===tf(e)&&this.matchesComparison(tg(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return g()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}}class tA extends tI{static create(t,e){return new tA(t,e)}matches(t){return"and"===this.op?void 0===this.filters.find(e=>!e.matches(t)):void 0!==this.filters.find(e=>e.matches(t))}getFlattenedFilters(){return null!==this.D||(this.D=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.D}getFilters(){return Object.assign([],this.filters)}constructor(t,e){super(),this.filters=t,this.op=e,this.D=null}}class tV extends tk{matches(t){let e=q.comparator(t.key,this.key);return this.matchesComparison(e)}constructor(t,e,n){super(t,e,n),this.key=q.fromName(n.referenceValue)}}class tN extends tk{matches(t){return this.keys.some(e=>e.isEqual(t.key))}constructor(t,e){super(t,"in",e),this.keys=tF("in",e)}}class tP extends tk{matches(t){return!this.keys.some(e=>e.isEqual(t.key))}constructor(t,e){super(t,"not-in",e),this.keys=tF("not-in",e)}}function tF(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(t=>q.fromName(t.referenceValue))}class tx extends tk{matches(t){let e=t.data.field(this.field);return tv(e)&&tm(e.arrayValue,this.value)}constructor(t,e){super(t,"array-contains",e)}}class tR extends tk{matches(t){let e=t.data.field(this.field);return null!==e&&tm(this.value.arrayValue,e)}constructor(t,e){super(t,"in",e)}}class tD extends tk{matches(t){if(tm(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let e=t.data.field(this.field);return null!==e&&!tm(this.value.arrayValue,e)}constructor(t,e){super(t,"not-in",e)}}class tO extends tk{matches(t){let e=t.data.field(this.field);return!(!tv(e)||!e.arrayValue.values)&&e.arrayValue.values.some(t=>tm(this.value.arrayValue,t))}constructor(t,e){super(t,"array-contains-any",e)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(t,e="asc"){this.field=t,this.dir=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tL{static fromTimestamp(t){return new tL(t)}static min(){return new tL(new tl(0,0))}static max(){return new tL(new tl(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}constructor(t){this.timestamp=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tq{insert(t,e){return new tq(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,tM.BLACK,null,null))}remove(t){return new tq(this.comparator,this.root.remove(t,this.comparator).copy(null,null,tM.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){let n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){let t=[];return this.inorderTraversal((e,n)=>(t.push("".concat(e,":").concat(n)),!1)),"{".concat(t.join(", "),"}")}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new tU(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new tU(this.root,t,this.comparator,!1)}getReverseIterator(){return new tU(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new tU(this.root,t,this.comparator,!0)}constructor(t,e){this.comparator=t,this.root=e||tM.EMPTY}}class tU{getNext(){let t=this.nodeStack.pop(),e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}}class tM{copy(t,e,n,r,i){return new tM(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this,i=n(t,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===i?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n))).fixUp()}removeMin(){if(this.left.isEmpty())return tM.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),(t=t.copy(null,null,null,t.left.removeMin(),null)).fixUp()}remove(t,e){let n,r=this;if(0>e(t,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return tM.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=(t=(t=t.copy(null,null,null,null,t.right.rotateRight())).rotateLeft()).colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=(t=t.rotateRight()).colorFlip()),t}rotateLeft(){let t=this.copy(null,null,tM.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){let t=this.copy(null,null,tM.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){let t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw g();let t=this.left.check();if(t!==this.right.check())throw g();return t+(this.isRed()?0:1)}constructor(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:tM.RED,this.left=null!=r?r:tM.EMPTY,this.right=null!=i?i:tM.EMPTY,this.size=this.left.size+1+this.right.size}}tM.EMPTY=null,tM.RED=!0,tM.BLACK=!1,tM.EMPTY=new class{get key(){throw g()}get value(){throw g()}get color(){throw g()}get left(){throw g()}get right(){throw g()}copy(t,e,n,r,i){return this}insert(t,e,n){return new tM(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}constructor(){this.size=0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tj{has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){let n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){let e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new tz(this.data.getIterator())}getIteratorFrom(t){return new tz(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(t=>{e=e.add(t)}),e}isEqual(t){if(!(t instanceof tj)||this.size!==t.size)return!1;let e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){let t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){let t=[];return this.forEach(e=>{t.push(e)}),t}toString(){let t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){let e=new tj(this.comparator);return e.data=t,e}constructor(t){this.comparator=t,this.data=new tq(this.comparator)}}class tz{getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}constructor(t){this.iter=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tB{static empty(){return new tB([])}unionWith(t){let e=new tj(L.comparator);for(let t of this.fields)e=e.add(t);for(let n of t)e=e.add(n);return new tB(e.toArray())}covers(t){for(let e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return $(this.fields,t.fields,(t,e)=>t.isEqual(e))}constructor(t){this.fields=t,t.sort(L.comparator)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tK{static empty(){return new tK({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(!tT(e=(e.mapValue.fields||{})[t.get(n)]))return null;return(e=(e.mapValue.fields||{})[t.lastSegment()])||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=tS(e)}setAll(t){let e=L.emptyPath(),n={},r=[];t.forEach((t,i)=>{if(!e.isImmediateParentOf(i)){let t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=i.popLast()}t?n[i.lastSegment()]=tS(t):r.push(i.lastSegment())});let i=this.getFieldsMap(e);this.applyChanges(i,n,r)}delete(t){let e=this.field(t.popLast());tT(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return tp(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];tT(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){for(let r of(te(e,(e,n)=>t[e]=n),n))delete t[r]}clone(){return new tK(tS(this.value))}constructor(t){this.value=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tG{static newInvalidDocument(t){return new tG(t,0,tL.min(),tL.min(),tL.min(),tK.empty(),0)}static newFoundDocument(t,e,n,r){return new tG(t,1,e,tL.min(),n,r,0)}static newNoDocument(t,e){return new tG(t,2,e,tL.min(),tL.min(),tK.empty(),0)}static newUnknownDocument(t,e){return new tG(t,3,e,tL.min(),tL.min(),tK.empty(),2)}convertToFoundDocument(t,e){return this.createTime.isEqual(tL.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=tK.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=tK.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=tL.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof tG&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new tG(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return"Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {createTime: ").concat(this.createTime,"}), {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})")}constructor(t,e,n,r,i,s,a){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tY{constructor(t,e=null,n=[],r=[],i=null,s=null,a=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this.C=null}}function tQ(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null;return new tY(t,e,n,r,i,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tH{constructor(t,e=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.S=null,this.N=null,this.O=null,this.startAt,this.endAt}}function tW(t,e){let n=t.filters.concat([e]);return new tH(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tJ{constructor(){this._=void 0}}class tX extends tJ{}class tZ extends tJ{constructor(t){super(),this.elements=t}}class t$ extends tJ{constructor(t){super(),this.elements=t}}class t0 extends tJ{constructor(t,e){super(),this.serializer=t,this.q=e}}class t1{static none(){return new t1}static exists(t){return new t1(void 0,t)}static updateTime(t){return new t1(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}constructor(t,e){this.updateTime=t,this.exists=e}}class t4{}class t2 extends t4{getFieldMask(){return null}constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class t3 extends t4{getFieldMask(){return this.fieldMask}constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}}class t9 extends t4{getFieldMask(){return null}constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class t5 extends t4{getFieldMask(){return null}constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t6={asc:"ASCENDING",desc:"DESCENDING"},t8={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},t7={and:"AND",or:"OR"};class et{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ee(t,e){return t.useProto3Json?"".concat(new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z",""),".").concat(("000000000"+e.nanoseconds).slice(-9),"Z"):{seconds:""+e.seconds,nanos:e.nanoseconds}}function en(t){return y(!!t),tL.fromTimestamp(function(t){let e=ts(t);return new tl(e.seconds,e.nanos)}(t))}function er(t,e){return ei(t,e).canonicalString()}function ei(t,e){let n=new O(["projects",t.projectId,"databases",t.database]).child("documents");return void 0===e?n:n.child(e)}function es(t,e){return er(t.databaseId,e.path)}function ea(t,e,n){return{name:es(t,e),fields:n.value.mapValue.fields}}function eo(t){return{fieldPath:t.canonicalString()}}function el(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(t){return new et(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec extends class{}{Z(){if(this.Y)throw new S(b,"The client has already been terminated.")}P(t,e,n,r){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(i=>{let[s,a]=i;return this.connection.P(t,ei(e,n),r,s,a)}).catch(t=>{throw"FirebaseError"===t.name?(t.code===_&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new S(w,t.toString())})}g(t,e,n,r,i){return this.Z(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(s=>{let[a,o]=s;return this.connection.g(t,ei(e,n),r,a,o,i)}).catch(t=>{throw"FirebaseError"===t.name?(t.code===_&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new S(w,t.toString())})}terminate(){this.Y=!0,this.connection.terminate()}constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.Y=!1}}async function eh(t,e){let n={writes:e.map(e=>(function(t,e){var n;let r;if(e instanceof t2)r={update:ea(t,e.key,e.value)};else if(e instanceof t9)r={delete:es(t,e.key)};else if(e instanceof t3)r={update:ea(t,e.key,e.data),updateMask:function(t){let e=[];return t.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}(e.fieldMask)};else{if(!(e instanceof t5))return g();r={verify:es(t,e.key)}}return e.fieldTransforms.length>0&&(r.updateTransforms=e.fieldTransforms.map(t=>(function(t,e){let n=e.transform;if(n instanceof tX)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof tZ)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof t$)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof t0)return{fieldPath:e.field.canonicalString(),increment:n.q};throw g()})(0,t))),e.precondition.isNone||(r.currentDocument=void 0!==(n=e.precondition).updateTime?{updateTime:ee(t,n.updateTime.toTimestamp())}:void 0!==n.exists?{exists:n.exists}:g()),r})(t.serializer,e))};await t.P("Commit",t.serializer.databaseId,O.emptyPath(),n)}async function ed(t,e){let{B:n,parent:r}=function(t,e){var n,r,i,s;let a;let o={structuredQuery:{}},l=e.path;null!==e.collectionGroup?(a=l,o.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(a=l.popLast(),o.structuredQuery.from=[{collectionId:l.lastSegment()}]),o.parent=(n=a,er(t.databaseId,n));let u=function(t){if(0!==t.length)return function t(e){return e instanceof tk?function(t){if("=="===t.op){if(tb(t.value))return{unaryFilter:{field:eo(t.field),op:"IS_NAN"}};if(t_(t.value))return{unaryFilter:{field:eo(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(tb(t.value))return{unaryFilter:{field:eo(t.field),op:"IS_NOT_NAN"}};if(t_(t.value))return{unaryFilter:{field:eo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:eo(t.field),op:t8[t.op],value:t.value}}}(e):e instanceof tA?function(e){let n=e.getFilters().map(e=>t(e));return 1===n.length?n[0]:{compositeFilter:{op:t7[e.op],filters:n}}}(e):g()}(tA.create(t,"and"))}(e.filters);u&&(o.structuredQuery.where=u);let c=function(t){if(0!==t.length)return t.map(t=>({field:eo(t.field),direction:t6[t.dir]}))}(e.orderBy);c&&(o.structuredQuery.orderBy=c);let h=(r=e.limit,t.useProto3Json||null==r?r:{value:r});return null!==h&&(o.structuredQuery.limit=h),e.startAt&&(o.structuredQuery.startAt={before:(i=e.startAt).inclusive,values:i.position}),e.endAt&&(o.structuredQuery.endAt={before:!(s=e.endAt).inclusive,values:s.position}),{B:o,parent:a}}(t.serializer,(e.N||(e.N=function(t,e){if("F"===t.limitType)return tQ(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(t=>{let e="desc"===t.dir?"asc":"desc";return new tC(t.field,e)});let n=t.endAt?new tE(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new tE(t.startAt.position,t.startAt.inclusive):null;return tQ(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}(e,function(t){if(null===t.S){let e;t.S=[];let n=new Set;for(let e of t.explicitOrderBy)t.S.push(e),n.add(e.field.canonicalString());let r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(e=new tj(L.comparator),t.filters.forEach(t=>{t.getFlattenedFilters().forEach(t=>{t.isInequality()&&(e=e.add(t.field))})}),e).forEach(e=>{n.has(e.canonicalString())||e.isKeyField()||t.S.push(new tC(e,r))}),n.has(L.keyField().canonicalString())||t.S.push(new tC(L.keyField(),r))}return t.S}(e))),e.N));return(await t.g("RunQuery",t.serializer.databaseId,r,{structuredQuery:n.structuredQuery})).filter(t=>!!t.document).map(e=>(function(t,e,n){let r=function(t,e){let n=function(t){let e=O.fromString(t);return y(el(e)),e}(e);if(n.get(1)!==t.databaseId.projectId)throw new S(v,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new S(v,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new q((y(n.length>4&&"documents"===n.get(4)),n.popFirst(5)))}(t,e.name),i=en(e.updateTime),s=e.createTime?en(e.createTime):tL.min(),a=new tK({mapValue:{fields:e.fields}}),o=tG.newFoundDocument(r,i,s,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o})(t.serializer,e.document,void 0))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ef=new Map;function ep(t){if(t._terminated)throw new S(b,"The client has already been terminated.");if(!ef.has(t)){var e,n;d("ComponentProvider","Initializing Datastore");let r=new J((e=t._databaseId,new x(e,t.app.options.appId||"",t._persistenceKey,(n=t._freezeSettings()).host,n.ssl,n.experimentalForceLongPolling,n.experimentalAutoDetectLongPolling,K(n.experimentalLongPollingOptions),n.useFetchStreams)),fetch.bind(null)),i=eu(t._databaseId),s=new ec(t._authCredentials,t._appCheckCredentials,r,i);ef.set(t,s)}return ef.get(t)}class em{isEqual(t){var e,n;return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new S(v,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new S(v,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}!function(t,e,n,r){if(!0===e&&!0===r)throw new S(v,"".concat(t," and ").concat(n," cannot be used together."))}("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=K(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new S(v,"invalid long polling timeout: ".concat(t.timeoutSeconds," (must not be NaN)"));if(t.timeoutSeconds<5)throw new S(v,"invalid long polling timeout: ".concat(t.timeoutSeconds," (minimum allowed value is 5)"));if(t.timeoutSeconds>30)throw new S(v,"invalid long polling timeout: ".concat(t.timeoutSeconds," (maximum allowed value is 30)"))}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}}class eg{get app(){if(!this._app)throw new S(b,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new S(b,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new em(t),void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new I;switch(t.type){case"firstParty":return new N(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new S(v,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let e=ef.get(t);e&&(d("ComponentProvider","Removing Datastore"),ef.delete(t),e.terminate())}(this),Promise.resolve()}constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new em({}),this._settingsFrozen=!1}}function ey(t,e){let n="object"==typeof t?t:(0,s.Mq)(),r=(0,s.qX)(n,"firestore/lite").getImmediate({identifier:"string"==typeof t?t:e||"(default)"});if(!r._initialized){let t=(0,l.P0)("firestore");t&&function(t,e,n){var r;let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=(t=B(t,eg))._getSettings(),a="".concat(e,":").concat(n);if("firestore.googleapis.com"!==s.host&&s.host!==a&&p("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),i.mockUserToken){let e,n;if("string"==typeof i.mockUserToken)e=i.mockUserToken,n=u.MOCK_USER;else{e=(0,l.Sg)(i.mockUserToken,null===(r=t._app)||void 0===r?void 0:r.options.projectId);let s=i.mockUserToken.sub||i.mockUserToken.user_id;if(!s)throw new S(v,"mockUserToken must contain 'sub' or 'user_id' field!");n=new u(s)}t._authCredentials=new k(new E(e,n))}}(r,...t)}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{withConverter(t){return new ew(this.firestore,t,this._query)}constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}}class ev{get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new e_(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ev(this.firestore,t,this._key)}constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}}class e_ extends ew{get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let t=this._path.popLast();return t.isEmpty()?null:new ev(this.firestore,null,new q(t))}withConverter(t){return new e_(this.firestore,t,this._path)}constructor(t,e,n){super(t,e,new tH(n)),this._path=n,this.type="collection"}}function eb(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];if(t=(0,l.m9)(t),U("collection","path",e),t instanceof eg){let n=O.fromString(e,...r);return j(n),new e_(t,null,n)}{if(!(t instanceof ev||t instanceof e_))throw new S(v,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=t._path.child(O.fromString(e,...r));return j(n),new e_(t.firestore,null,n)}}function eT(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];if(t=(0,l.m9)(t),1==arguments.length&&(e=X.newId()),U("doc","path",e),t instanceof eg){let n=O.fromString(e,...r);return M(n),new ev(t,null,new q(n))}{if(!(t instanceof ev||t instanceof e_))throw new S(v,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=t._path.child(O.fromString(e,...r));return M(n),new ev(t.firestore,t instanceof e_?t.converter:null,new q(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{static fromBase64String(t){try{return new eS(tr.fromBase64String(t))}catch(t){throw new S(v,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new eS(tr.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}constructor(t){this._byteString=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{isEqual(t){return this._internalPath.isEqual(t._internalPath)}constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new S(v,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new L(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Z(this._lat,t._lat)||Z(this._long,t._long)}constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new S(v,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new S(v,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eA=/^__.*__$/;class eV{toMutation(t,e){return null!==this.fieldMask?new t3(t,this.data,this.fieldMask,e,this.fieldTransforms):new t2(t,this.data,e,this.fieldTransforms)}constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}}function eN(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw g()}}class eP{get path(){return this.settings.path}get et(){return this.settings.et}rt(t){return new eP(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}nt(t){var e;let n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.rt({path:n,it:!1});return r.st(t),r}ot(t){var e;let n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.rt({path:n,it:!1});return r.tt(),r}ut(t){return this.rt({path:void 0,it:!0})}_t(t){return eU(t,this.settings.methodName,this.settings.ct||!1,this.path,this.settings.lt)}contains(t){return void 0!==this.fieldMask.find(e=>t.isPrefixOf(e))||void 0!==this.fieldTransforms.find(e=>t.isPrefixOf(e.field))}tt(){if(this.path)for(let t=0;t<this.path.length;t++)this.st(this.path.get(t))}st(t){if(0===t.length)throw this._t("Document fields must not be empty");if(eN(this.et)&&eA.test(t))throw this._t('Document fields cannot begin and end with "__"')}constructor(t,e,n,r,i,s){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.tt(),this.fieldTransforms=i||[],this.fieldMask=s||[]}}class eF{ht(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return new eP({et:t,methodName:e,lt:n,path:L.emptyPath(),it:!1,ct:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||eu(t)}}function ex(t){let e=t._freezeSettings(),n=eu(t._databaseId);return new eF(t._databaseId,!!e.ignoreUndefinedProperties,n)}function eR(t,e){if(eO(t=(0,l.m9)(t)))return eC("Unsupported field value:",e,t),eD(t,e);if(t instanceof eI)return function(t,e){if(!eN(e.et))throw e._t("".concat(t._methodName,"() can only be used with update() and set()"));if(!e.path)throw e._t("".concat(t._methodName,"() is not currently supported inside arrays"));let n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.it&&4!==e.et)throw e._t("Nested arrays are not supported");return function(t,e){let n=[],r=0;for(let i of t){let t=eR(i,e.ut(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){var n,r,i,s;if(null===(t=(0,l.m9)(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t){return n=e.serializer,"number"==typeof(r=t)&&Number.isInteger(r)&&!Q(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER?{integerValue:""+r}:function(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Q(e)?"-0":e}}(n,r)}if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){let n=tl.fromDate(t);return{timestampValue:ee(e.serializer,n)}}if(t instanceof tl){let n=new tl(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:ee(e.serializer,n)}}if(t instanceof ek)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof eS){return{bytesValue:(i=e.serializer,s=t._byteString,i.useProto3Json?s.toBase64():s.toUint8Array())}}if(t instanceof ev){let n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e._t("Document reference is for database ".concat(r.projectId,"/").concat(r.database," but should be for database ").concat(n.projectId,"/").concat(n.database));return{referenceValue:er(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e._t("Unsupported field value: ".concat(z(t)))}(t,e)}function eD(t,e){let n={};return!function(t){for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(t)?te(t,(t,r)=>{let i=eR(r,e.nt(t));null!=i&&(n[t]=i)}):e.path&&e.path.length>0&&e.fieldMask.push(e.path),{mapValue:{fields:n}}}function eO(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof tl||t instanceof ek||t instanceof eS||t instanceof ev||t instanceof eI)}function eC(t,e,n){if(!eO(n)||!("object"==typeof n&&null!==n&&(Object.getPrototypeOf(n)===Object.prototype||null===Object.getPrototypeOf(n)))){let r=z(n);throw"an object"===r?e._t(t+" a custom object"):e._t(t+" "+r)}}let eL=RegExp("[~\\*/\\[\\]]");function eq(t,e,n){if(e.search(eL)>=0)throw eU("Invalid field path (".concat(e,"). Paths must not contain '~', '*', '/', '[', or ']'"),t,!1,void 0,n);try{return new eE(...e.split("."))._internalPath}catch(r){throw eU("Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"),t,!1,void 0,n)}}function eU(t,e,n,r,i){let s=r&&!r.isEmpty(),a=void 0!==i,o="Function ".concat(e,"() called with invalid data");n&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=" in field ".concat(r)),a&&(l+=" in document ".concat(i)),l+=")"),new S(v,o+t+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eM{get id(){return this._key.path.lastSegment()}get ref(){return new ev(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let t=new ej(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){let e=this._document.data.field(eB("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}constructor(t,e,n,r,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=i}}class ej extends eM{data(){return super.data()}}class ez{get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return 0===this.docs.length}forEach(t,e){this._docs.forEach(t,e)}constructor(t,e){this._docs=e,this.query=t}}function eB(t,e){return"string"==typeof e?eq(t,e):e instanceof eE?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eK{}class eG extends eK{}function eY(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];let s=[];for(let n of(e instanceof eK&&s.push(e),function(t){let e=t.filter(t=>t instanceof eH).length,n=t.filter(t=>t instanceof eQ).length;if(e>1||e>0&&n>0)throw new S(v,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s=s.concat(r)),s))t=n._apply(t);return t}class eQ extends eG{static _create(t,e,n){return new eQ(t,e,n)}_apply(t){let e=this._parse(t);return e1(t._query,e),new ew(t.firestore,t.converter,tW(t._query,e))}_parse(t){let e=ex(t.firestore);return function(t,e,n,r,i,s,a){let o;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new S(v,"Invalid Query. You can't perform '".concat(s,"' queries on documentId()."));if("in"===s||"not-in"===s){e0(a,s);let e=[];for(let n of a)e.push(e$(r,t,n));o={arrayValue:{values:e}}}else o=e$(r,t,a)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||e0(a,s),o=function(t,e,n){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return eR(n,t.ht(r?4:3,e))}(n,e,a,"in"===s||"not-in"===s);return tk.create(i,s,o)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}}class eH extends eK{static _create(t,e){return new eH(t,e)}_parse(t){let e=this._queryConstraints.map(e=>e._parse(t)).filter(t=>t.getFilters().length>0);return 1===e.length?e[0]:tA.create(e,this._getOperator())}_apply(t){let e=this._parse(t);return 0===e.getFilters().length?t:(function(t,e){let n=t;for(let t of e.getFlattenedFilters())e1(n,t),n=tW(n,t)}(t._query,e),new ew(t.firestore,t.converter,tW(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}constructor(t,e){super(),this.type=t,this._queryConstraints=e}}class eW extends eG{static _create(t,e){return new eW(t,e)}_apply(t){let e=function(t,e,n){if(null!==t.startAt)throw new S(v,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new S(v,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new tC(e,n)}(t._query,this._field,this._direction);return new ew(t.firestore,t.converter,function(t,e){let n=t.explicitOrderBy.concat([e]);return new tH(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}}function eJ(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"asc",n=eB("orderBy",t);return eW._create(n,e)}class eX extends eG{static _create(t,e,n){return new eX(t,e,n)}_apply(t){var e,n,r;return new ew(t.firestore,t.converter,(e=t._query,n=this._limit,r=this._limitType,new tH(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),n,r,e.startAt,e.endAt)))}constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}}function eZ(t){return function(t,e){if(e<=0)throw new S(v,"Function ".concat(t,"() requires a positive number, but it was: ").concat(e,"."))}("limit",t),eX._create("limit",t,"F")}function e$(t,e,n){if("string"==typeof(n=(0,l.m9)(n))){if(""===n)throw new S(v,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!(null!==e.collectionGroup)&&-1!==n.indexOf("/"))throw new S(v,"Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '".concat(n,"' contains a '/' character."));let r=e.path.child(O.fromString(n));if(!q.isDocumentKey(r))throw new S(v,"Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '".concat(r,"' is not because it has an odd number of segments (").concat(r.length,")."));return tw(t,new q(r))}if(n instanceof ev)return tw(t,n._key);throw new S(v,"Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(z(n),"."))}function e0(t,e){if(!Array.isArray(t)||0===t.length)throw new S(v,"Invalid Query. A non-empty array is required for '".concat(e.toString(),"' filters."))}function e1(t,e){let n=function(t,e){for(let n of t)for(let t of n.getFlattenedFilters())if(e.indexOf(t.op)>=0)return t.op;return null}(t.filters,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new S(v,"Invalid query. You cannot use more than one '".concat(e.op.toString(),"' filter.")):new S(v,"Invalid query. You cannot use '".concat(e.op.toString(),"' filters with '").concat(n.toString(),"' filters."))}class e4 extends class{convertValue(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";switch(tf(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ta(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(to(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw g()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none",n={};return te(t,(t,r)=>{n[t]=this.convertValue(r,e)}),n}convertGeoPoint(t){return new ek(ta(t.latitude),ta(t.longitude))}convertArray(t,e){return(t.values||[]).map(t=>this.convertValue(t,e))}convertServerTimestamp(t,e){switch(e){case"previous":let n=tc(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(th(t));default:return null}}convertTimestamp(t){let e=ts(t);return new tl(e.seconds,e.nanos)}convertDocumentKey(t,e){let n=O.fromString(t);y(el(n));let r=new R(n.get(1),n.get(3)),i=new q(n.popFirst(5));return r.isEqual(e)||f("Document ".concat(i," contains a document reference within a different database (").concat(r.projectId,"/").concat(r.database,") which is not supported. It will be treated as a reference in the current database (").concat(e.projectId,"/").concat(e.database,") instead.")),i}}{convertBytes(t){return new eS(t)}convertReference(t){let e=this.convertDocumentKey(t,this.firestore._databaseId);return new ev(this.firestore,null,e)}constructor(t){super(),this.firestore=t}}function e2(t){!function(t){if("L"===t.limitType&&0===t.explicitOrderBy.length)throw new S(T,"limitToLast() queries require specifying at least one orderBy() clause")}((t=B(t,ew))._query);let e=ep(t.firestore),n=new e4(t.firestore);return ed(e,t._query).then(e=>{let r=e.map(e=>new ej(t.firestore,n,e.key,e,t.converter));return"L"===t._query.limitType&&r.reverse(),new ez(t,r)})}function e3(t,e,n){var r;let i=(r=(t=B(t,ev)).converter)?n&&(n.merge||n.mergeFields)?r.toFirestore(e,n):r.toFirestore(e):e,s=function(t,e,n,r,i){let s,a,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},u=t.ht(o.merge||o.mergeFields?2:0,e,n,i);eC("Data must be an object, but it was:",u,r);let c=eD(r,u);if(o.merge)s=new tB(u.fieldMask),a=u.fieldTransforms;else if(o.mergeFields){let t=[];for(let r of o.mergeFields){let i=function(t,e,n){if((e=(0,l.m9)(e))instanceof eE)return e._internalPath;if("string"==typeof e)return eq(t,e);throw eU("Field path arguments must be of type string or ",t,!1,void 0,n)}(e,r,n);if(!u.contains(i))throw new S(v,"Field '".concat(i,"' is specified in your field mask but missing from your input data."));(function(t,e){return t.some(t=>t.isEqual(e))})(t,i)||t.push(i)}s=new tB(t),a=u.fieldTransforms.filter(t=>s.covers(t.field))}else s=null,a=u.fieldTransforms;return new eV(new tK(c),s,a)}(ex(t.firestore),"setDoc",t._key,i,null!==t.converter,n);return eh(ep(t.firestore),[s.toMutation(t._key,t1.none())])}c="".concat(s.Jn,"_lite"),(0,s.Xd)(new a.wA("firestore/lite",(t,e)=>{let{instanceIdentifier:n,options:r}=e,i=t.getProvider("app").getImmediate(),s=new eg(new A(t.getProvider("auth-internal")),new F(t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new S(v,'"projectId" not provided in firebase.initializeApp.');return new R(t.options.projectId,e)}(i,n),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),(0,s.KN)("firestore-lite","4.4.3",""),(0,s.KN)("firestore-lite","4.4.3","esm2017")}}]);