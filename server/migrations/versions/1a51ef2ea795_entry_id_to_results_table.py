"""<entry id to results table>

Revision ID: 1a51ef2ea795
Revises: 24f6b6d9c813
Create Date: 2023-08-07 14:53:39.148195

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a51ef2ea795'
down_revision = '24f6b6d9c813'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('entry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('submission', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('competition_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['competition_id'], ['competitions.id'], name=op.f('fk_entry_competition_id_competitions')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_entry_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('entries')
    with op.batch_alter_table('results', schema=None) as batch_op:
        batch_op.add_column(sa.Column('entry_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_results_entry_id_entry'), 'entry', ['entry_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('results', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_results_entry_id_entry'), type_='foreignkey')
        batch_op.drop_column('entry_id')

    op.create_table('entries',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('submission', sa.VARCHAR(), nullable=True),
    sa.Column('description', sa.VARCHAR(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('competition_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['competition_id'], ['competitions.id'], name='fk_entries_competition_id_competitions'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_entries_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('entry')
    # ### end Alembic commands ###
