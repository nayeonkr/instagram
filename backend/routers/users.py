from fastapi import APIRouter, HTTPException, Depends
from deps import SessionDep
from models import User, Post
from sqlalchemy import select
from typing import Annotated
from schemas import ProfileOut

router = APIRouter(prefix='/api/users', tags=['users'])

def get_user_or_404(username: str, db: SessionDep):
    user = db.scalar(select(User).where(User.username == username))
    if user is None:
        raise HTTPException(status_code=404, detail='없는 사용자입니다.')
    return user

UserDep = Annotated[User, Depends(get_user_or_404)]


@router.get('/{username}', response_model=ProfileOut) #api/users/bob
def profile(user: UserDep):
    return user

@router.get('/{username}/posts')
def user_posts(user: UserDep, db: SessionDep):
    return db.scalars(select(Post).where(Post.user_id == user.id)).all()