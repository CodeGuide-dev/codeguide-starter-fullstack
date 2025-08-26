flowchart TD
  Start[Landing Page]
  SignUpPage[Sign Up Page]
  SignInPage[Sign In Page]
  AuthAPI[Authentication API Endpoint]
  DashboardPage[Dashboard Page]
  Start -->|Select Sign Up| SignUpPage
  Start -->|Select Sign In| SignInPage
  SignUpPage -->|Submit Credentials| AuthAPI
  SignInPage -->|Submit Credentials| AuthAPI
  AuthAPI -->|Success| DashboardPage
  AuthAPI -->|Error| SignUpPage
  AuthAPI -->|Error| SignInPage
  DashboardPage -->|Click Logout| Start