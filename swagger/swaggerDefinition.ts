export const swaggerDefinition = {
    "openapi": "3.0.3",
    "info": {
      "title": "Loans API",
      "description": "API for managing loan requests and loan information.",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "https://api.loans.projects.bbdgrad.com"
      }
    ],
    "paths": {
      "/loans/request": {
        "post": {
          "summary": "Request a new loan for a persona",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "personaId": {
                      "type": "number",
                      "description": "The persona's unique identifier"
                    },
                    "loanAmount": {
                      "type": "number",
                      "description": "The amount of the loan to request"
                    }
                  },
                  "example": {
                    "personaId": 12345,
                    "loanAmount": 1500
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Successfully created a new loan request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "loanId": {
                        "type": "number",
                        "description": "The unique identifier of the created loan"
                      },
                      "message": {
                        "type": "string",
                        "description": "Success message"
                      }
                    }
                  },
                  "example": {
                    "loanId": 123,
                    "message": "Loan request successful."
                  }
                }
              }
            },
            "400": {
              "description": "Bad request, e.g., company out of funds or persona does not exist",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Error message"
                      }
                    }
                  },
                  "example": {
                    "message": "We broke fam."
                  }
                }
              }
            },
            "403": {
              "description": "Unauthorized request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Unauthorized message"
                      }
                    }
                  },
                  "example": {
                    "message": "Unauthorized"
                  }
                }
              }
            }
          }
        }
      },
      "/loans/info/{loanId}": {
        "get": {
          "summary": "Request loan information by loanId",
          "parameters": [
            {
              "name": "loanId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              },
              "description": "The unique identifier of the loan"
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully retrieved loan information",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "loanId": {
                        "type": "number",
                        "description": "The unique identifier of the loan"
                      },
                      "loanAmount": {
                        "type": "number",
                        "description": "The amount of the loan"
                      },
                      "amountPaid": {
                        "type": "number",
                        "description": "The amount already paid for the loan"
                      },
                      "startDate": {
                        "type": "string",
                        "description": "The start date of the loan"
                      },
                      "termDurationYears": {
                        "type": "number",
                        "description": "The duration of the loan in years"
                      },
                      "interestRate": {
                        "type": "number",
                        "description": "The interest rate of the loan"
                      }
                    }
                  },
                  "example": {
                    "loanId": 123,
                    "loanAmount": 1500,
                    "amountPaid": 500,
                    "startDate": "01|05|03",
                    "termDurationYears": 1,
                    "interestRate": 0.12
                  }
                }
              }
            },
            "400": {
              "description": "Bad request, e.g., incorrect loanId",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Error message"
                      }
                    }
                  },
                  "example": {
                    "message": "No loan information found."
                  }
                }
              }
            },
            "403": {
              "description": "Unauthorized request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Unauthorized message"
                      }
                    }
                  },
                  "example": {
                    "message": "Unauthorized"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "securitySchemes": {
        "BearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    }
  }
