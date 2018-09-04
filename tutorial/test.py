def log(func):
    def wrapper(*args, **kw):
        print 'begin call'
        result = func(*args, **kw)
        print 'end call'
        return result
    return wrapper


@log
def now():
    print '2018-08-09'


if __name__ == '__main__':
    now()

    # print now.__name__
