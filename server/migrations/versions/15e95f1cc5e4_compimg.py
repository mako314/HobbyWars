"""<compImg>

Revision ID: 15e95f1cc5e4
Revises: 1a51ef2ea795
Create Date: 2023-08-09 22:50:45.860740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15e95f1cc5e4'
down_revision = '1a51ef2ea795'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('competitions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('compImg', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('competitions', schema=None) as batch_op:
        batch_op.drop_column('compImg')

    # ### end Alembic commands ###
