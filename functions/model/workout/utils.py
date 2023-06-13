import numpy as np
import pandas as pd


def find_nearest(array, value):
    array = np.asarray(array)
    idx = (np.abs(array - value)).argmin()
    return array[idx]


def get_y():
    with open('y.npy', 'rb') as f:
        return np.load(f)


def get_y_df():
    return pd.read_csv('y_df.csv', delimiter=';')
