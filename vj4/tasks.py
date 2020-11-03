import os
import time

from celery import Celery

app = Celery('tasks', backend='rpc://', broker='pyamqp://guest@{}//'.format(os.getenv("MQ_HOST", default='localhost')))


@app.task
def celery_test():
    print('This is a test for celery...')
    time.sleep(1)
    print('Slept for 1 second...')
    return
