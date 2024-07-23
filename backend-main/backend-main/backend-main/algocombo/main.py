from fastapi import Body, FastAPI, status
from fastapi.responses import JSONResponse
from algorithms import routers as algorithms_router

app = FastAPI()
app.include_router(algorithms_router.router, prefix="/algorithms",
                   tags=["algorithms"])


@app.get("/")
def health_check():
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Hello World"})
