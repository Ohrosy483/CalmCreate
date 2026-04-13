openapi: 3.1.0
info:
  # Do not change the title, if the title changes, the import paths will be broken
  title: Api
  version: 0.1.0
  description: API specification
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: Auth
    description: Browser and mobile authentication endpoints.
  - name: profile
    description: User profile and settings.
  - name: usage
    description: Daily usage tracking.
  - name: help
    description: AI-style help responses.
  - name: account
    description: Account management.
paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      summary: Health check
      description: Returns server health status
      responses:
        "200":
          description: Healthy
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"
  /auth/user:
    get:
      tags: [Auth]
      operationId: getCurrentAuthUser
      summary: Get the currently authenticated user
      parameters:
        - $ref: '#/components/parameters/AuthorizationSessionHeader'
        - $ref: '#/components/parameters/SessionCookie'
      responses:
        '200':
          description: Auth status resolved successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthUserEnvelope'
  /login:
    get:
      tags: [Auth]
      operationId: beginBrowserLogin
      summary: Start the browser OIDC login flow
      parameters:
        - name: returnTo
          in: query
          required: false
          schema:
            type: string
      responses:
        '302':
          description: Redirect to the OIDC authorization endpoint.
  /callback:
    get:
      tags: [Auth]
      operationId: handleBrowserLoginCallback
      summary: Complete the browser OIDC login flow
      parameters:
        - name: code
          in: query
          required: false
          schema:
            type: string
        - name: state
          in: query
          required: false
          schema:
            type: string
        - name: iss
          in: query
          required: false
          schema:
            type: string
      responses:
        '302':
          description: Redirect on success or failure.
  /logout:
    get:
      tags: [Auth]
      operationId: logoutBrowserSession
      summary: Clear the session and begin OIDC logout
      parameters:
        - $ref: '#/components/parameters/AuthorizationSessionHeader'
        - $ref: '#/components/parameters/SessionCookie'
      responses:
        '302':
          description: Redirect to the OIDC provider logout URL.
  /mobile-auth/token-exchange:
    post:
      tags: [Auth]
      operationId: exchangeMobileAuthorizationCode
      summary: Exchange a mobile OIDC code for a session token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MobileTokenExchangeRequest'
      responses:
        '200':
          description: Session created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MobileTokenExchangeSuccess'
        '400':
          description: Missing or invalid required fields.
        '401':
          description: Token did not contain usable claims.
        '500':
          description: Token exchange failed.
  /mobile-auth/logout:
    post:
      tags: [Auth]
      operationId: logoutMobileSession
      summary: Delete a mobile session token
      parameters:
        - $ref: '#/components/parameters/AuthorizationSessionHeader'
      responses:
        '200':
          description: Logout processed.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LogoutSuccess'
  /profile:
    get:
      tags: [profile]
      operationId: getProfile
      summary: Get current user profile
      responses:
        '200':
          description: Profile loaded.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          description: Not authenticated.
    put:
      tags: [profile]
      operationId: updateProfile
      summary: Update current user profile
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateProfileBody'
      responses:
        '200':
          description: Profile updated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          description: Not authenticated.
  /usage:
    get:
      tags: [usage]
      operationId: getUsage
      summary: Get today's usage count
      responses:
        '200':
          description: Usage data.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsageStatus'
        '401':
          description: Not authenticated.
  /usage/increment:
    post:
      tags: [usage]
      operationId: incrementUsage
      summary: Increment today's post usage count
      responses:
        '200':
          description: Usage incremented.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsageStatus'
        '403':
          description: Daily limit reached.
        '401':
          description: Not authenticated.
  /plan/upgrade:
    post:
      tags: [profile]
      operationId: upgradePlan
      summary: Upgrade to premium (demo mode)
      responses:
        '200':
          description: Plan upgraded.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          description: Not authenticated.
  /plan/downgrade:
    post:
      tags: [profile]
      operationId: downgradePlan
      summary: Downgrade to free plan (demo mode)
      responses:
        '200':
          description: Plan downgraded.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          description: Not authenticated.
  /help:
    post:
      tags: [help]
      operationId: getHelp
      summary: Get AI-style help response
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/HelpRequest'
      responses:
        '200':
          description: Help response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/HelpResponse'
  /account:
    delete:
      tags: [account]
      operationId: deleteAccount
      summary: Delete the current user account
      responses:
        '200':
          description: Account deleted.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LogoutSuccess'
        '401':
          description: Not authenticated.
components:
  parameters:
    AuthorizationSessionHeader:
      name: Authorization
      in: header
      required: false
      description: Opaque session token — `Bearer <sid>`.
      schema:
        type: string
    SessionCookie:
      name: sid
      in: cookie
      required: false
      description: Browser session cookie.
      schema:
        type: string
  schemas:
    HealthStatus:
      type: object
      properties:
        status:
          type: string
      required:
        - status
    AuthUser:
      type: object
      required: [id, email, firstName, lastName, profileImageUrl]
      properties:
        id:
          type: string
        email:
          type: [string, 'null']
          format: email
        firstName:
          type: [string, 'null']
        lastName:
          type: [string, 'null']
        profileImageUrl:
          type: [string, 'null']
    AuthUserEnvelope:
      type: object
      required: [user]
      properties:
        user:
          oneOf:
            - $ref: '#/components/schemas/AuthUser'
            - type: 'null'
    MobileTokenExchangeRequest:
      type: object
      required: [code, code_verifier, redirect_uri, state]
      properties:
        code:
          type: string
          minLength: 1
        code_verifier:
          type: string
          minLength: 1
        redirect_uri:
          type: string
          minLength: 1
          format: uri
        state:
          type: string
          minLength: 1
        nonce:
          type: string
          minLength: 1
    MobileTokenExchangeSuccess:
      type: object
      required: [token]
      properties:
        token:
          type: string
    LogoutSuccess:
      type: object
      required: [success]
      properties:
        success:
          type: boolean
          const: true
    ErrorEnvelope:
      type: object
      required: [error]
      properties:
        error:
          type: string
    UserProfile:
      type: object
      required: [userId, planTier, displayName, email, firstName, lastName, profileImageUrl]
      properties:
        userId:
          type: string
        planTier:
          type: string
          enum: [free, premium]
        displayName:
          type: [string, 'null']
        email:
          type: [string, 'null']
        firstName:
          type: [string, 'null']
        lastName:
          type: [string, 'null']
        profileImageUrl:
          type: [string, 'null']
    UpdateProfileBody:
      type: object
      properties:
        displayName:
          type: string
    UsageStatus:
      type: object
      required: [postsUsed, planTier, limitReached]
      properties:
        postsUsed:
          type: integer
        planTier:
          type: string
          enum: [free, premium]
        limitReached:
          type: boolean
    HelpRequest:
      type: object
      required: [question]
      properties:
        question:
          type: string
    HelpResponse:
      type: object
      required: [answer]
      properties:
        answer:
          type: string

